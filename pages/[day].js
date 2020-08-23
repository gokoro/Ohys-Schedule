import moment from 'moment-timezone'

import { useRouter } from 'next/router'
import { useContext } from 'react'

import Head from 'next/head'
import Section from "../components/Section"
import SectionTitle from '../components/SectionTitle'
import AnimeList from '../components/AnimeList'
import AnimeCardList from '../components/AnimeCardList'
import ListTypeSwitcher from '../components/ListTypeSwitcher'

import ListTypeContext from '../context/ListTypeContext'

export default function Day() {
    const { listType } = useContext(ListTypeContext.Original)

    const router = useRouter()
    const { day } = router.query

    if (!day) {
      return null
    }

    const jpMoment = moment().tz('Asia/Tokyo')
    const toDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][jpMoment.day()]  

    return (
      <>
        <Head>
          <title>{`${day || ''} `}| Ohys-Schedule</title>
        </Head>
        <Section>
          <SectionTitle size="1.5rem">
            <span style={{textTransform: 'capitalize'}}>{day}{day === toDay && ' (Today)'}</span>'s Animes
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
        `}</style>
      </>
    )
}
