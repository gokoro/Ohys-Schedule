import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { styled } from '../lib/stitches'
import debounce from 'lodash.debounce'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import Highlighter from 'react-highlight-words'
import { BsSearch } from 'react-icons/bs'
import { useAnimeSearch } from '../hooks/useAnime'
import {
  animeSearchKeywordState,
  animeSearchActiveState,
} from '../states/animeSearch'
import { useRouter } from 'next/router'

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
  all: 'unset',
  width: '100%',
  height: 20,
  padding: '8px 0',
})

const Flex = styled('div', {
  display: 'flex',
})

const InputContainer = styled(Flex, {
  padding: '0 8px',
  border: '1px solid #e9ecef',
  borderRadius: 5,
})

const getDebounced = (callback, ms) => debounce(callback, ms)

const SearchInput = (props) => {
  const router = useRouter()
  const inputRef = useRef(null)
  const [keyword, setKeyword] = useRecoilState(animeSearchKeywordState)
  const setSearchOpen = useSetRecoilState(animeSearchActiveState)

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
      <BsSearch />
      <Input
        {...props}
        defaultValue={keyword}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder="Search..."
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

const AnimeItem = ({ id, name, ...props }) => {
  const href = `/search?q=${name}`
  const keyword = useRecoilValue(animeSearchKeywordState)

  return (
    <Link href={href} passHref>
      <StyledAnimeLink {...props}>
        <StyledAnimeContainer>
          <Highlighter
            searchWords={[keyword]}
            autoEscape={true}
            textToHighlight={name}
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

const SearchResult = (props) => {
  const keyword = useRecoilValue(animeSearchKeywordState)

  const setSearchOpen = useSetRecoilState(animeSearchActiveState)

  const [cached, setCached] = useState([])

  const { data: res, isLoading } = useAnimeSearch(keyword)
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
        {cached.map(({ _id, name }) => (
          <AnimeItem key={_id} id={_id} name={name} onClick={handleItemClick} />
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

export { SearchInput, SearchResult }
