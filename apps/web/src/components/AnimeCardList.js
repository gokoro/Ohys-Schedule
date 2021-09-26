import * as React from 'react'
import { urlFilter } from '../lib/urlFilter'

import { AnimeCard } from './AnimeCard'

import { useRecoilValue } from 'recoil'

import { PreferredLanguageState } from '../states/preferredLanguage'

const AnimeCardList = ({ data, day }) => {
  const lang = useRecoilValue(PreferredLanguageState)

  return (
    <Form>
      {data.map((item) => (
        <AnimeCard
          key={item._id}
          id={item._id}
          name={item.title[lang] || item.title.romaji}
          day={day}
          time={item.released_time}
          imageUrl={item.smallImageUrl}
          placeholderColor={item.color}
          href={`/anime/${item._id}/${urlFilter(item.name)}`}
        />
      ))}
    </Form>
  )
}
const Form = ({ children }) => (
  <div className="animecardlist">
    {children}
    <style jsx>{`
      .animecardlist {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        column-gap: 48px;
        row-gap: 36px;
      }
      @media screen and (max-width: 768px) {
        .animecardlist {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media screen and (max-width: 568px) {
        .animecardlist {
          grid-template-columns: repeat(2, 1fr);
          column-gap: 1rem;
        }
      }
    `}</style>
  </div>
)
export default AnimeCardList
