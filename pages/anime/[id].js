import { useRouter } from 'next/router'

import Section from "../../components/Section"
import AnimeDetails from '../../components/AnimeDetails'
import AnimeTorrentList from '../../components/AnimeTorrentList'
import AnimeDescriptionSection from '../../components/AnimeDescriptionSection'
import AnimeTorrentOtherLink from '../../components/AnimeTorrentOtherLink'

export default function name() {
    const router = useRouter()
    const { id } = router.query

    if (!id) {
        return null
    }
    return (
        <>
            <Section>
                <AnimeDetails 
                    animeId={id}
                    margin="8rem 0 24px"
                    mobileMargin="8rem 0 0 0"
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
                        margin: 0 0 42px 0;
                    }
                }
            `}</style>
        </>
    )
}