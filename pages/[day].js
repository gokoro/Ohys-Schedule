import moment from 'moment-timezone'

import { useRouter } from 'next/router'
import { useContext } from 'react'

import Head from 'next/head'
import Section from "../components/Section"
import SectionTitle from '../components/SectionTitle'
import AnimeList from '../components/AnimeList'
import AnimeCardList from '../components/AnimeCardList'
import ListTypeSwitcher from '../components/ListTypeSwitcher'
import ChangeDayButtonContainer from '../components/ChangeDayButtonContainer'

import LanguageContext from '../context/LanguageContext'
import ListTypeContext from '../context/ListTypeContext'

export default function Day() {
    const { listType } = useContext(ListTypeContext.Original)
    const { locale } = useContext(LanguageContext.Original)

    const router = useRouter()
    const { day } = router.query

    if (!day) {
      return null
    }

    const jpMoment = moment().tz('Asia/Tokyo')
    const dayList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const currentDayNum = dayList.indexOf(day)

    const toDay = dayList[jpMoment.day()]
    const prevDay = dayList[currentDayNum - 1] || 'sat'
    const nextDay = dayList[currentDayNum + 1] || 'sun'

    return (
      <>
        <Head>
          <title>{`${locale.common.day[day] || ''} `}| Ohys-Schedule</title>
        </Head>
        <Section>
          <SectionTitle size="1.5rem">
            {day === toDay && `${locale.day.headers.today}, `}{locale.day.headers[day]}
          </SectionTitle>
          <div className="buttonSection">
            <ListTypeSwitcher />
          </div>
          {listType === 'list' &&
            <AnimeList 
              day={day}
            />
          }
          {listType === 'card' &&
            <AnimeCardList 
              day={day}
            />
          }
        </Section>
        <Section>
          <div className="dayButtonContainer">
            <ChangeDayButtonContainer 
              prevDay={prevDay}
              nextDay={nextDay}
            />
          </div>
        </Section>
        <style jsx>{`
          .buttonSection {
            margin-bottom: 16px;
          }
          .buttonSection :global(.switch) {
            margin-left: auto;
          }
          .buttonSection :global(.switch button) {
            margin-left: 4px;
          }
          .dayButtonContainer {
            margin-top: 20px;
          }
        `}</style>
      </>
    )
}
