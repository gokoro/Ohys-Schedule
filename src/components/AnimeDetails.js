import * as React from 'react'
import { motion } from 'framer-motion'
import { styled } from '../lib/stitches'

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
  minHeight: '100vh',
  height: 'fit-content',
  maxWidth: '100%',
})

const PosterImage = styled('img', {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'cover',
  borderRadius: 2,
})

const FlexContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '0em 8em',
  color: '#FFF',
  gap: '1.4em',
})

const LeftItemContainer = styled('div', {
  flex: '0 0 250px',
})
const RightItemContainer = styled('div', {
  flex: '1',
  paddingTop: '2em',
  position: 'relative',
})

const Title = styled('div', {
  fontSize: '2.4rem',
  fontWeight: 'bold',
  lineHeight: '3rem',
  marginBottom: '2em',
})

const SubTitle = styled('div', {
  color: '#adb5bd',
  marginBottom: 8,
})

const EpisodeContainer = styled('div', {
  display: 'flex',
  gap: '1em',
})

const AnimeDetails = ({ animeId, ...props }) => {
  const lang = useRecoilValue(PreferredLanguageState)

  const { data: res, isLoading } = useAnime(animeId)
  const data = res?.data

  console.log('~ data', data)

  if (isLoading) {
    return null
  }

  return (
    <Container {...props}>
      <FlexContainer>
        <LeftItemContainer>
          <PosterImage src={data.imageUrl} />
        </LeftItemContainer>
        <RightItemContainer>
          <SubTitle>
            {data.released_year} / {data.items.length}{' '}
            {data.items.length > 1 ? 'items' : 'item'}
          </SubTitle>
          <Title>{data.title[lang] || data.name}</Title>
          <EpisodeContainer>
            {data.episode_info.slice(0, 3).map(({ title, thumbnail }) => (
              <AnimeEpisodeListItem
                episodeName={title}
                imageUrl={thumbnail}
                style={{
                  width: '180px',
                }}
              />
            ))}
          </EpisodeContainer>
        </RightItemContainer>
      </FlexContainer>
      <BannerImage src={data.bannerImage || ''} />
    </Container>
  )
}
export default AnimeDetails
