import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import { css, styled } from '../lib/stitches'
import { urlFilter } from '../lib/urlFilter'

const Container = styled('div', {
  color: '#000',
  display: 'flex',
  background: '#FFF',
  borderRadius: 3,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  transition: 'box-shadow .1s',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  },
})

const imageStyle = css({
  borderRadius: '3px',
})

const LeftSide = styled('div', {
  flex: '0 0 100px',
  width: '100%',
  '@sm': {
    flex: '0 0 100px',
  },
})

const RightSide = styled('div', {
  flex: '1',
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  padding: '24px 16px',
  '@md': {},
})

const Title = styled('div', {
  fontWeight: 700,
  fontSize: '0.9rem',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': 2,
  overflow: 'hidden',

  '@sm': {
    fontSize: '1.1rem',
  },
})

const SubTitle = styled('div', {
  fontSize: '0.4rem',
  color: '#868e96',
  '@sm': {
    fontSize: '0.7rem',
  },
})

const SearchCard = ({
  id,
  title,
  originalName = title,
  imageUrl,
  year,
  itemCount,
  ...props
}) => {
  const href = `/anime/${id}/${urlFilter(originalName)}`

  return (
    <Link legacyBehavior href={href}>
      <a>
        <Container {...props}>
          <LeftSide>
            <AspectRatio.Root ratio={4 / 5} style={{ padding: '0' }}>
              <Image
                className={imageStyle()}
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </AspectRatio.Root>
          </LeftSide>
          <RightSide>
            <Title>{title}</Title>
            <SubTitle>
              {year} / {itemCount} {itemCount <= 1 ? 'File' : 'Files'}
            </SubTitle>
          </RightSide>
        </Container>
      </a>
    </Link>
  )
}

export default SearchCard
