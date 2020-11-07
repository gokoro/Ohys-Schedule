import { useRouter } from 'next/router'
import { useAnime } from '../../hooks/useAnime'

import Helmet from '../../components/Helmet'
import Section from "../../components/Section"
import AnimeDetails from '../../components/AnimeDetails'
import AnimeTorrentList from '../../components/AnimeTorrentList'
import AnimeDescriptionSection from '../../components/AnimeDescriptionSection'
import AnimeTorrentOtherLink from '../../components/AnimeTorrentOtherLink'

export default function name({ initialData }) {
    const router = useRouter()
    const { id } = router.query

    if (!id) {
        return null
    }

    const { data: animeData, isLoading } = useAnime(id, { initialData })

    return (
        <>
            {!isLoading && (
                <Helmet
                    title={animeData.data.name}
                    description={`${animeData.data.description.slice(0, 250)}...`}
                    image={animeData.data.imageUrl}
                />
            )}
            <Section>
                <AnimeDetails 
                    animeId={id}
                    margin="8rem 0 24px"
                    mobileMargin="3rem 0 0 0"
                />
            </Section>
            <Section>
                <div className="bottom-section-container">
                    <div className="torrent">
                        <AnimeTorrentList 
                            animeId={id}
                        />
                        <AnimeTorrentOtherLink 
                            animeId={id}
                        />
                    </div>
                    <div className="ep">
                        <AnimeDescriptionSection 
                            animeId={id}
                        />
                    </div>
                </div>
            </Section>
            <style jsx>{`
                .bottom-section-container {
                    display: flex;
                }
                .bottom-section-container > .torrent {
                    flex: 2 0 0;
                    margin-right: 32px;
                }
                .bottom-section-container > .ep {
                    flex: 1 0 0;
                }
                .bottom-section-container > .torrent :global(.anime-torrent-other-link) {
                    margin-top: 24px;
                }
                @media screen and (max-width: 568px) {
                    .bottom-section-container {
                        flex-direction: column;
                    }
                    .bottom-section-container > .torrent {
                        margin: 0 0 24px 0;
                    }
                }
            `}</style>
        </>
    )
}

name.getInitialProps = async (ctx) => {
    const { apiUrl } = process.env
    const { id } = ctx.query

    if (!ctx.req) {
        return {
            initialData: null
        }
    }

    const res = await fetch(`${apiUrl}/anime?id=${id}`)
    const anime = await res.json()

    return {
        initialData: anime
    }
}