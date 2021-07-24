import { useRef, useEffect, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { styled } from '../lib/stitches'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { BsSearch } from 'react-icons/bs'
import { useAnimeSearch } from '../hooks/useAnime'
import { animeSearchKeywordState } from '../states/animeSearch'

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

const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner, {
  // background: '#000',
})

const AnimeItem = styled('div', {
  padding: '8px 0',
  margin: '0 12px',
  borderBottom: '1px solid #f1f3f5',
})

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

const SearchInput = (props) => {
  const inputRef = useRef(null)
  const setKeyword = useSetRecoilState(animeSearchKeywordState)

  const handleChange = (e) => {
    setKeyword(e.target.value || '')
  }

  useEffect(() => {
    inputRef.current.focus()

    return () => setKeyword('')
  }, [])

  return (
    <InputContainer css={{ alignItems: 'center' }}>
      <BsSearch />
      <Input
        {...props}
        onChange={handleChange}
        placeholder="Search..."
        ref={inputRef}
        css={{ marginLeft: 8 }}
      />
    </InputContainer>
  )
}

const SearchResult = (props) => {
  const keyword = useRecoilValue(animeSearchKeywordState)

  const { data, isLoading } = useAnimeSearch(keyword)

  return (
    <ScrollArea {...props}>
      <ScrollAreaViewport>
        {isLoading ? (
          <></>
        ) : (
          data.data.map(({ _id, name }) => (
            <AnimeItem key={_id}>{name}</AnimeItem>
          ))
        )}
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
