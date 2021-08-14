import * as React from 'react'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentDayState } from '../states/currentTime'
import { LocaleMessageState } from '../states/preferredLanguage'
import ClassNameAsPathLink from './ClassNameAsPathLink'
import { useRouter } from 'next/router'

const HeaderLinks = () => {
  const {
    common: { day: dayLocaleSet },
  } = useRecoilValue(LocaleMessageState)

  const currentDayRecoil = useRecoilValue(currentDayState)
  const [currentDay] = useState(currentDayRecoil)

  return (
    <div className="wrapper">
      <DayLink day={currentDay} text={dayLocaleSet.sun} value="sun" />
      <DayLink day={currentDay} text={dayLocaleSet.mon} value="mon" />
      <DayLink day={currentDay} text={dayLocaleSet.tue} value="tue" />
      <DayLink day={currentDay} text={dayLocaleSet.wed} value="wed" />
      <DayLink day={currentDay} text={dayLocaleSet.thu} value="thu" />
      <DayLink day={currentDay} text={dayLocaleSet.fri} value="fri" />
      <DayLink day={currentDay} text={dayLocaleSet.sat} value="sat" />
      <style jsx>{`
        .wrapper {
          width: 100%;
          display: flex;
        }
      `}</style>
    </div>
  )
}
const DayLink = (props) => {
  const {
    components: { header: dayLocaleSet },
  } = useRecoilValue(LocaleMessageState)

  const isTodayActive = props.day === props.value

  const { pathname } = useRouter()
  const TRANSPARENT_PATH = `/anime/[id]/[name]`

  return (
    <>
      <ClassNameAsPathLink
        activeClassName="active"
        href="/[day]"
        as={`/${props.value}`}
      >
        <a>
          <div className={`now${isTodayActive ? ' nowActive' : ''}`}>
            {dayLocaleSet.now}
          </div>
          <div className={`today${isTodayActive ? ' nowActive' : ''}`}>
            {props.text}
          </div>
        </a>
      </ClassNameAsPathLink>
      <style jsx>{`
        a {
          flex: 1;
          display: inline-block;
          position: relative;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.05s ease-in;
          outline: 0;
          text-align: center;
          padding: 12px 0;
          height: fit-content;
          letter-spacing: 0;
          color: ${pathname === TRANSPARENT_PATH
            ? '#FFF '
            : 'var(--sub-text-color);'};

          border-bottom: 2px solid transparent;
        }
        .now {
          display: none;
        }
        .now.nowActive {
          position: absolute;
          width: 100%;
          font-size: 10px;
          left: 0;
          top: -3px;
          display: initial;
        }
        .nowActive {
          font-weight: bold;
          color: ${pathname === TRANSPARENT_PATH ? '#FFF ' : '#000000'};
        }
        .active {
          border-bottom: 2px solid #6c5ce7;
          color: ${pathname === TRANSPARENT_PATH ? '#FFF ' : '#6c5ce7'};
          font-weight: bold;
        }
        .active .nowActive {
          color: ${pathname === TRANSPARENT_PATH ? '#FFF ' : '#6c5ce7'};
        }
      `}</style>
    </>
  )
}

export default HeaderLinks
