import moment from 'moment-timezone'
import { api } from '../lib/api'

import Link from 'next/link'

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSchedule } from '../hooks/useSchedule'

import { currentAnimeState, currentAnimeIndexState } from '../states/currentAnime'
import { currentSecondState, currentDayState } from '../states/currentTime'
import { LocaleMessageState } from '../states/preferredLanguage'
import { animeListTypeState } from '../states/animeListType'

import Section from "../components/Section"
import SectionTitle from '../components/SectionTitle'
import NextUpBox from '../components/NextUpBox'
import PlaceholderBox from '../components/PlaceholderBox'
import AnimeList from '../components/AnimeList'
import AnimeCardList from '../components/AnimeCardList'
import ListTypeSwitcher from '../components/ListTypeSwitcher'

export default function Main({ schedules }) {
  const [ currentAnime, setCurrentAnime ] = useRecoilState(currentAnimeState)
  const [ currentAnimeIndex, setCurrentAnimeIndex ] = useRecoilState(currentAnimeIndexState)

  const currentSecond = useRecoilValue(currentSecondState)
  const day = useRecoilValue(currentDayState)

  const locale = useRecoilValue(LocaleMessageState)
  const listType = useRecoilValue(animeListTypeState)

  const initialData = schedules[day]

  const schedule = useSchedule(day, { initialData })
  const res = schedule.data
  
  const animeTimeList = res.data.map((item) => item.released_time)

  useEffect(() => {
        for (let i = 0, l = animeTimeList.length; i < l; i++) {
            const releaseTime = moment
                .duration(animeTimeList[i])
                .add(30, 'minutes')
                .asSeconds()

            const isCurrentNext = currentSecond <= releaseTime

            if (!isCurrentNext) {
                continue
            }

            if (isCurrentNext && currentAnimeIndex === i) {
                return
            }
            
            if (isCurrentNext && currentAnimeIndex !== i) {
                setCurrentAnimeIndex(i)
                setCurrentAnime(res.data[i])
                
                return
            }
        }

        if (!currentAnime) {
            const lastIndex = animeTimeList.length - 1

            setCurrentAnimeIndex(lastIndex)
            setCurrentAnime(res.data[lastIndex])

            return
        }

  }, [day, currentSecond])

  return (
      <>
        <Section>
          <div className="top-container">
            <div className="item nextupBox">
              <Section>
                <SectionTitle size="1.8rem" >{locale.main.nextUp}</SectionTitle>
                <PlaceholderBox
                  isLoading={!currentAnime}
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

export async function getStaticProps() {
  const schedules = {
    sun: null,
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
  }

  const retrieveSchedule = async (day) => {
    const res = await api.get(`/schedule`, { params: { day }})
    const data = res.data

    schedules[day] = data
  }

  await Promise.all(
      Object.keys(schedules).map(retrieveSchedule)
  )

  return {
    props: { schedules },
    revalidate: 60 * 60
  }
}