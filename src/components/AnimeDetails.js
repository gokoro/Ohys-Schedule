import * as React from 'react'
import { motion } from 'framer-motion'
import { styled } from '../lib/stitches'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Placeholder from './Placeholder'
import { AnimeEpisodeListItem } from './AnimeEpisodeList'

import { PreferredLanguageState } from '../states/preferredLanguage'

import { useAnime } from '../hooks/useAnime'
import { useRecoilValue } from 'recoil'

const Container = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  '&:before': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85))',
    backdropFilter: 'blur(30px)',
  },
})

const BannerImage = styled('img', {
  objectFit: 'cover',
  width: '100%',
  maxWidth: '100%',
  height: '80vh',
  '@sm': {
    height: '100vh',
  },
})

const PosterImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 2,
})

const FlexContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '0em 1em',
  color: '#FFF',
  gap: '1.4em',
  '@md': {
    padding: '0em 4em',
  },
  '@lg': {
    padding: '0em 8em',
  },
})

const LeftItemContainer = styled('div', {
  flex: '0 0 30%',
  '@md': {
    flex: '0 0 250px',
  },
})
const RightItemContainer = styled('div', {
  flex: '1',
  paddingTop: '2em',
  position: 'relative',
})

const Title = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 'bold',
  lineHeight: '2rem',
  marginBottom: '2em',
  '@sm': {
    fontSize: '2.4rem',
    lineHeight: '3rem',
  },
})

const SubTitle = styled('div', {
  fontSize: '0.8rem',
  color: '#adb5bd',
  marginBottom: 0,
  '@sm': {
    fontSize: '1rem',
    marginBottom: 8,
  },
})

const EpisodeContainer = styled('div', {
  gap: '1em',
  display: 'none',
  '@sm': {
    display: 'flex',
  },
})

const AnimeDetails = ({ animeId, ...props }) => {
  const lang = useRecoilValue(PreferredLanguageState)

  const { data: res, isLoading } = useAnime(animeId)
  const data = res?.data

  if (isLoading) {
    return null
  }

  return (
    <Container {...props}>
      <FlexContainer>
        <LeftItemContainer>
          <AspectRatio.Root ratio={2 / 3}>
            <PosterImage src={data.imageUrl} />
          </AspectRatio.Root>
        </LeftItemContainer>
        <RightItemContainer>
          <SubTitle>
            {data.released_year} / {data.items.length}{' '}
            {data.items.length > 1 ? 'items' : 'item'}
          </SubTitle>
          <Title>{data.title[lang] || data.name}</Title>
          <EpisodeContainer>
            {data.episode_info.slice(0, 3).map(({ _id, title, thumbnail }) => (
              <AnimeEpisodeListItem
                key={_id}
                episodeName={`${title}`}
                imageUrl={thumbnail}
                style={{
                  maxWidth: '180px',
                  flex: '1',
                }}
              />
            ))}
          </EpisodeContainer>
        </RightItemContainer>
      </FlexContainer>
      <BannerImage src={data.bannerImage || data.imageUrl || ''} />
    </Container>
  )
}
export default AnimeDetails
