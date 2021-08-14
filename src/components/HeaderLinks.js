import * as React from 'react'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentDayState } from '../states/currentTime'
import { LocaleMessageState } from '../states/preferredLanguage'
import ClassNameAsPathLink from './ClassNameAsPathLink'
import { useRouter } from 'next/router'

const HeaderLinks = ({ isDisplayColor }) => {
  const {
    common: { day: dayLocaleSet },
  } = useRecoilValue(LocaleMessageState)

  const currentDayRecoil = useRecoilValue(currentDayState)
  const [currentDay] = useState(currentDayRecoil)

  return (
    <div className="wrapper">
      <DayLink
        day={currentDay}
        text={dayLocaleSet.sun}
        isDisplayColor={isDisplayColor}
        value="sun"
      />
      <DayLink
        day={currentDay}
        text={dayLocaleSet.mon}
        isDisplayColor={isDisplayColor}
        value="mon"
      />
      <DayLink
        day={currentDay}
        text={dayLocaleSet.tue}
        isDisplayColor={isDisplayColor}
        value="tue"
      />
      <DayLink
        day={currentDay}
        text={dayLocaleSet.wed}
        isDisplayColor={isDisplayColor}
        value="wed"
      />
      <DayLink
        day={currentDay}
        text={dayLocaleSet.thu}
        isDisplayColor={isDisplayColor}
        value="thu"
      />
      <DayLink
        day={currentDay}
        text={dayLocaleSet.fri}
        isDisplayColor={isDisplayColor}
        value="fri"
      />
      <DayLink
        day={currentDay}
        text={dayLocaleSet.sat}
        isDisplayColor={isDisplayColor}
        value="sat"
      />
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
          color: ${!props.isDisplayColor ? '#FFF ' : 'var(--sub-text-color);'};
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
          color: ${!props.isDisplayColor ? '#FFF ' : '#000000'};
        }
        .active {
          border-bottom: 2px solid #6c5ce7;
          color: ${!props.isDisplayColor ? '#FFF ' : '#6c5ce7'};
          font-weight: bold;
        }
        .active .nowActive {
          color: ${!props.isDisplayColor ? '#FFF ' : '#6c5ce7'};
        }
      `}</style>
    </>
  )
}

export default HeaderLinks
