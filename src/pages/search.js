import { useRouter } from 'next/router'
import { useAnimeSearch } from '../hooks/useAnime'
import { styled } from '../lib/stitches'
import Helmet from '../components/Helmet'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import SearchCard from '../components/SearchCard'

const Flex = styled('div', {
  display: 'flex',
})

const ButtonContainer = styled(Flex, {
  marginBottom: 64,
  justifyContent: 'flex-end',
})

const Switcher = styled('span', {
  marginLeft: 'auto',
})

const SearchItem = styled(SearchCard, {
  margin: '14px 0',
})

const SearchPage = () => {
  const router = useRouter()
  const { q: keyword } = router.query

  const { data: res } = useAnimeSearch(keyword)
  const data = res?.data || []

  return (
    <>
      <Helmet
        title={`${keyword || ''} - Search results | Ohys-Schedule`}
        description={`This is the result of searching for the ${keyword} in Ohys-Raws.`}
      />
      <Section>
        <SectionTitle size="1.5rem">
          '{keyword || ''}' results ({data.length})
        </SectionTitle>
        {data.map((anime) => (
          <SearchItem
            key={anime._id}
            id={anime._id}
            title={anime.name}
            imageUrl={anime.imageUrl}
            year={anime.released_year}
            itemCount={anime.items.length}
          />
        ))}
      </Section>
    </>
  )
}

export default SearchPage
