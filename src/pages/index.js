import moment from 'moment-timezone'

import Link from 'next/link'

import { useSchedule } from '../hooks/useSchedule'

import { useContext, useState, useEffect } from 'react'
import LanguageContext from '../context/LanguageContext'
import ListTypeContext from '../context/ListTypeContext'

import Section from "../components/Section"
import SectionTitle from '../components/SectionTitle'
import NextUpBox from '../components/NextUpBox'
import PlaceholderBox from '../components/PlaceholderBox'
import AnimeList from '../components/AnimeList'
import AnimeCardList from '../components/AnimeCardList'
import ListTypeSwitcher from '../components/ListTypeSwitcher'

export default function Main({ schedules }) {
  const { day, dayByNumber, jpMoment } = getToday()

  const { listType } = useContext(ListTypeContext.Original)
  const { locale } = useContext(LanguageContext.Original)

  const { data: initialData } = schedules[dayByNumber]

  const schedule = useSchedule(day, { initialData }, { enableRevalidate: true })
  const res = schedule.data

  const [ currentAnime, setCurrentAnime ] = useState(res.data[res.data.length - 1])

  useEffect(() => {
    if (!schedule.isLoading) {
        const jstTime = moment.duration(jpMoment.format('HH:mm')).asSeconds()
            
        setCurrentAnime(res.data[res.data.length - 1])
            
        for (let i = 0; i < res.data.length; i++) {
            const releaseTime = moment.duration(res.data[i].released_time).asSeconds() + (30 * 60) // + 30 minutes

            if (jstTime <= releaseTime) {
                setCurrentAnime(res.data[i])
                break
            }
        }
    }
  }, [])


  return (
      <>
        <Section>
          <div className="top-container">
            <div className="item nextupBox">
              <Section>
                <SectionTitle size="1.8rem" >{locale.main.nextUp}</SectionTitle>
                <PlaceholderBox
                  isLoading={schedule.isLoading}
                  className="link"
                  placeholderLineCount={9}>
                    <NextUpBox
                      dayOfWeek={day}
                      nextUpAnime={currentAnime}
                    />
                </PlaceholderBox>
              </Section>
            </div>
          </div>
        </Section>
        <Section>
          <SectionTitle
            size="1.8rem"
            isDisplayLink
            href="/[day]"
            as={`/${day}`}
            linkText={`> ${locale.main.seeDetails}`}
          >
            <Link href="/[day]" as={`/${day}`}>
              <a style={{color: '#000000'}}>{locale.main.todayUp}</a>
            </Link>
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
          .top-container {
            display: flex;
          }
          .top-container > .item.nextupBox {
            flex: 1 0 0;
          }
          .nextupBox :global(.section) {
            padding-top: 0;
          }
          :global(.animecardlist) {
            margin-top: 48px;
          }
          .buttonSection {
            margin-bottom: 16px;
          }
          .buttonSection :global(.switch) {
            margin-left: auto;
          }
          .buttonSection :global(.switch button) {
            margin-left: 4px;
          }
          @media screen and (max-width: 1080px) {
            .top-container {
              flex-direction: column-reverse;
            }
            .nextupBox {
              margin-left: 0;
            }
          }
        `}</style>
      </>
  )
}
function getToday() {
  const jpMoment = moment().tz('Asia/Tokyo')
  const dayByNumber = jpMoment.day()
  const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayByNumber]
  
  return {
    jpMoment,
    day,
    dayByNumber
  }
}

export async function getStaticProps() {
  const { apiUrl } = process.env
  const dayItems = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const retrieveSchedule = async (day) => {
    const res = await fetch(`${apiUrl}/schedule?day=${day}`)
    const data = await res.json()

    return { day, data }
  }

  const schedules = await Promise.all(dayItems.map(retrieveSchedule))

  return {
    props: { schedules },
    revalidate: 60 * 60 * 24 // Refresh every 24 hour
  }
}