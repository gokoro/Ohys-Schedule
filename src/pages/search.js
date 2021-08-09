import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { useAnimeSearch } from '../hooks/useAnime'
import { styled } from '../lib/stitches'
import LoadingIndicator from 'react-spinners/BeatLoader'
import Helmet from '../components/Helmet'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import SearchCard from '../components/SearchCard'
import NotFoundImage from '../assets/notfound.svg'
import {
  LocaleMessageState,
  PreferredLanguageState,
} from '../states/preferredLanguage'

const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const SearchItem = styled(SearchCard, {
  margin: '14px 0',
})

const LoadingContainer = styled(Flex, {
  margin: '48px 0',
})

const NotFoundContainer = styled(Flex, {
  flexDirection: 'column',
  margin: '24px 0',
})

const NotFoundMessage = styled('div', {
  // fontWeight: 700,
  fontSize: '1.4rem',
  marginTop: 24,
})

const SearchPage = ({ q: initialKeyword }) => {
  const router = useRouter()
  const { q: keyword } = router.query

  const { data: res, isLoading } = useAnimeSearch(keyword)
  const data = res?.data || []

  const lang = useRecoilValue(PreferredLanguageState)
  const langMessage = useRecoilValue(LocaleMessageState)

  return (
    <>
      <Helmet
        title={`‘${
          keyword || initialKeyword || ''
        }’ search results | Ohys-Schedule`}
        description={`This is the result of searching for the ${
          keyword || initialKeyword || ''
        } in Ohys-Raws.`}
      />
      <Section>
        <SectionTitle size="1.5rem">
          &lsquo;{keyword || ''}&rsquo; {langMessage.search.searchResult}
        </SectionTitle>
      </Section>
      <Section>
        {/* If It's loading */}
        {isLoading && (
          <LoadingContainer>
            <LoadingIndicator />
          </LoadingContainer>
        )}
        {/* If It's been loaded */}
        {!isLoading &&
          data.map((anime) => (
            <SearchItem
              key={anime._id}
              id={anime._id}
              originalName={anime.name}
              title={anime.title[lang] || anime.name}
              imageUrl={anime.imageUrl}
              year={anime.released_year}
              itemCount={anime.items.length}
            />
          ))}
        {/* If not found */}
        {!isLoading && data.length === 0 && (
          <NotFoundContainer>
            <NotFoundImage width="30%" height="100%" viewBox="0 0 1170 777" />
            <NotFoundMessage>{langMessage.search.notfound}</NotFoundMessage>
          </NotFoundContainer>
        )}
      </Section>
    </>
  )
}

SearchPage.getInitialProps = (ctx) => ctx.query

export default SearchPage
