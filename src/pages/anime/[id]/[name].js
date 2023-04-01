import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'
import { useAnime } from '../../../hooks/useAnime'
import { buildApi } from '../../../lib/api'
import { urlFilter } from '../../../lib/urlFilter'

import AnimeDescriptionSection from '../../../components/AnimeDescriptionSection'
import AnimeDetails from '../../../components/AnimeDetails'
import AnimeTorrentList from '../../../components/AnimeTorrentList'
import AnimeTorrentOtherLink from '../../../components/AnimeTorrentOtherLink'
import Helmet from '../../../components/Helmet'
import Section from '../../../components/Section'

export const config = {
  runtime: 'experimental-edge',
}

export default function name({ initialData }) {
  const router = useRouter()
  const { id, name } = router.query

  if (!id || !name) {
    return null
  }

  const filteredName = urlFilter(initialData.data?.name || name)

  useEffect(() => {
    router.replace(`/anime/${id}/${filteredName}`)
  }, [filteredName])

  const { data: animeData, isLoading } = useAnime(id, { initialData })

  let description = ''

  if (!isLoading) {
    const info = animeData.data.description

    description = info.length < 250 ? info : `${info.slice(0, 250).trim()}...`
  }

  return (
    <>
      {!isLoading && (
        <Helmet
          title={animeData.data.name}
          description={description}
          image={animeData.data.imageUrl}
          themeColor={animeData.data.color}
        />
      )}
      <AnimeDetails animeId={id} />
      <Section>
        <div className="bottom-section-container">
          <div className="torrent">
            <AnimeTorrentList animeId={id} />
            <AnimeTorrentOtherLink animeId={id} />
          </div>
          <div className="ep">
            <AnimeDescriptionSection animeId={id} />
          </div>
        </div>
      </Section>
      <style jsx>{`
        .bottom-section-container {
          display: flex;
          margin-top: 90vh;
        }
        .bottom-section-container > .torrent {
          flex: 2 0 0;
          margin-right: 32px;
        }
        .bottom-section-container > .ep {
          flex: 1 0 0;
        }
        .bottom-section-container
          > .torrent
          :global(.anime-torrent-other-link) {
          margin-top: 24px;
        }
        @media screen and (max-width: 576px) {
          .bottom-section-container {
            flex-direction: column;
            margin-top: 70vh;
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
  const { id } = ctx.query

  if (!ctx.req) {
    return {
      initialData: false,
    }
  }

  const res = await buildApi.get(`/anime`, { params: { id } })
  const initialData = res.data

  return {
    initialData,
  }
}
