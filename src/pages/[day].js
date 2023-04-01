import * as React from 'react'
import { useRecoilValue } from 'recoil'
import AnimeCardList from '../components/AnimeCardList'
import AnimeList from '../components/AnimeList'
import ChangeDayButtonContainer from '../components/ChangeDayButtonContainer'
import Helmet from '../components/Helmet'
import ListTypeSwitcher from '../components/ListTypeSwitcher'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import { useSchedule } from '../hooks/useSchedule'
import { buildApi } from '../lib/api'
import dayjs from '../lib/dayjs'
import { animeListTypeState } from '../states/animeListType'
import { LocaleMessageState } from '../states/preferredLanguage'

export default function Day({ schedule, day }) {
  const locale = useRecoilValue(LocaleMessageState)

  const listType = useRecoilValue(animeListTypeState)

  const now = dayjs.tz()
  const dayList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const currentDayNum = dayList.indexOf(day)

  const toDay = dayList[now.day()]
  const prevDay = dayList[currentDayNum - 1] || 'sat'
  const nextDay = dayList[currentDayNum + 1] || 'sun'

  const todayAsLocale = locale.common.day[day]

  const { data } = useSchedule(day, { initialData: schedule })

  return (
    <>
      <Helmet
        title={`${todayAsLocale} | Ohys-Schedule`}
        description={`${todayAsLocale}'s animes which Ohys-Raws releases`}
      />
      <Section>
        <SectionTitle size="1.5rem">
          {day === toDay && `${locale.day.headers.today}, `}
          {locale.day.headers[day]}
        </SectionTitle>
        <div className="buttonSection">
          <ListTypeSwitcher />
        </div>
        {listType === 'list' && <AnimeList data={data.data} day={day} />}
        {listType === 'card' && <AnimeCardList data={data.data} day={day} />}
      </Section>
      <Section>
        <div className="dayButtonContainer">
          <ChangeDayButtonContainer prevDay={prevDay} nextDay={nextDay} />
        </div>
      </Section>
      <style jsx>{`
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
        .dayButtonContainer {
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { day: 'sun' } },
      { params: { day: 'mon' } },
      { params: { day: 'tue' } },
      { params: { day: 'wed' } },
      { params: { day: 'thu' } },
      { params: { day: 'fri' } },
      { params: { day: 'sat' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { day } = params

  const res = await buildApi.get(`/schedule`, { params: { day } })
  const schedule = res.data

  return {
    props: { schedule, day },
    // revalidate: 60 * 60 * 24,
  }
}
