import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { BsSearch } from 'react-icons/bs'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useAnimeSearchDebounced } from '../hooks/useAnime'
import { styled } from '../lib/stitches'
import {
  animeSearchActiveState,
  animeSearchKeywordState,
} from '../states/animeSearch'
import {
  LocaleMessageState,
  PreferredLanguageState,
} from '../states/preferredLanguage'

import * as HoverCard from '@radix-ui/react-hover-card'

const ScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: 200,
  borderRadius: 5,
  overflow: 'hidden',
  position: 'absolute !important',
  zIndex: '10',
  border: '1px solid #e9ecef',
  boxShadow: 'var(--shadow-smallest)',
})

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  backgroundColor: '#FFF',
})

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  background: '#e9ecef',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '#dee2e6' },
  '&[data-orientation="vertical"]': { width: 8 },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 8,
  },
})

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '#adb5bd',
  borderRadius: 10,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

const ScrollAreaCorner = ScrollAreaPrimitive.Corner

const Input = styled('input', {
  fontFamily: 'unset',
  outline: 'none',
  border: 'none',
  width: '100%',
  height: 20,
  padding: '18px 0',
  fontSize: '1rem',
})

const Flex = styled('div', {
  display: 'flex',
})

const InputContainer = styled(Flex, {
  background: '#FFF',
  padding: '0 8px',
  border: '1px solid #e9ecef',
  borderRadius: 5,
})

const SearchInput = (props) => {
  const router = useRouter()
  const inputRef = useRef(null)
  const [keyword, setKeyword] = useRecoilState(animeSearchKeywordState)
  const setSearchOpen = useSetRecoilState(animeSearchActiveState)
  const lang = useRecoilValue(LocaleMessageState)

  const handleChange = (e) => {
    setKeyword(e.target.value || '')
  }

  const ENTER_KEYCODE = 13

  const handleSubmit = (e) => {
    if (e.keyCode === ENTER_KEYCODE && e.target.value !== '') {
      router.push(`/search?q=${keyword}`)
      setSearchOpen(false)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <InputContainer css={{ alignItems: 'center' }}>
      <BsSearch color="#000" />
      <Input
        {...props}
        defaultValue={keyword}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder={lang.components.search.search}
        ref={inputRef}
        css={{ marginLeft: 8 }}
      />
    </InputContainer>
  )
}

const StyledAnimeContainer = styled(Flex, {
  padding: '8px 12px',
  borderBottom: '1px solid #f1f3f5',
  fontSize: 14,
  background: '#FFF',
  transition: 'background 10ms',

  '&:hover': {
    background: '#f8f9fa',
  },
})

const StyledAnimeLink = styled('a', {
  color: '#000',
  '&:hover': {
    color: '#000',
  },
})

const AnimeItem = ({ id, name, title, ...props }) => {
  const href = `/search?q=${name}`
  const keyword = useRecoilValue(animeSearchKeywordState)

  return (
    <Link legacyBehavior href={href} passHref>
      <StyledAnimeLink {...props}>
        <StyledAnimeContainer>
          <Highlighter
            searchWords={[keyword]}
            autoEscape={true}
            textToHighlight={title}
            highlightStyle={{
              color: '#4c6ef5',
              fontWeight: '700',
              background: 'none',
            }}
          />
        </StyledAnimeContainer>
      </StyledAnimeLink>
    </Link>
  )
}

const SearchMessage = styled('div', {
  color: '#868e96',
  textAlign: 'center',
  marginTop: 40,
  letterSpacing: '-.1px',
  fontSize: 14,
})

const SearchResult = (props) => {
  const keyword = useRecoilValue(animeSearchKeywordState)
  const lang = useRecoilValue(PreferredLanguageState)
  const langMessage = useRecoilValue(LocaleMessageState)

  const setSearchOpen = useSetRecoilState(animeSearchActiveState)

  const [cached, setCached] = useState([])

  const { data: res, isLoading } = useAnimeSearchDebounced(keyword)
  const data = res?.data

  const handleItemClick = () => {
    setSearchOpen(false)
  }

  useEffect(() => {
    if (!isLoading) {
      setCached(data)
    }
  }, [data])

  return (
    <ScrollArea {...props}>
      <ScrollAreaViewport>
        {keyword === '' && cached.length === 0 && (
          <SearchMessage>
            {langMessage.components.search.typeKeyword}
          </SearchMessage>
        )}

        {keyword !== '' && !isLoading && cached.length === 0 && (
          <SearchMessage>
            {langMessage.components.search.notFound}
          </SearchMessage>
        )}

        {cached.map(({ _id, name, title }) => (
          <AnimeItem
            key={_id}
            id={_id}
            name={name}
            title={title[lang] || name}
            onClick={handleItemClick}
          />
        ))}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  )
}

const HoverCardTrigger = styled(HoverCard.Trigger, {
  display: 'inline-block',
  height: 20,
  lineHeight: '18px',
  fontSize: '0.5rem',
  letterSpacing: 0,
  color: '#e67700',
  background: '#fff9db',
  padding: '0 8px',
  border: '1px solid #f08c00',
  borderRadius: 10,
  '&:hover': {
    cursor: 'pointer',
    color: '#e67700',
  },
})

const HoverCardContent = styled(HoverCard.Content, {
  letterSpacing: -0.1,
  padding: 10,
  fontSize: '0.8rem',
  background: '#FFF',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
})

const HoverCardArrow = styled(HoverCard.Arrow, {
  fill: '#FFF',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
})

const UnderLineText = styled('span', {
  borderBottom: '1px solid #000',
})

const SearchBetaMessage = () => {
  return (
    <>
      <HoverCard.Root openDelay={300} closeDelay={100}>
        <HoverCardTrigger>New</HoverCardTrigger>
        <HoverCardContent>
          <span>Searching from Ohys-Raws is now in Beta!</span>{' '}
          <UnderLineText
            as="a"
            css={{ fontWeight: 'bold' }}
            href="https://github.com/gokoro/Ohys-Schedule/commit/595bbf1589ce2bebf205884e9e55454c30d86d97#commitcomment-54895175"
            target="_black"
          >
            Learn More
          </UnderLineText>
          <HoverCardArrow />
        </HoverCardContent>
      </HoverCard.Root>
    </>
  )
}

export { SearchInput, SearchResult, SearchBetaMessage }
