import * as React from 'react'
import { BsClockFill } from 'react-icons/bs'

import AnimeTimeInfo from './AnimeTimeInfo'

const AnimeInfoSection = (props) => {
  const { day, time, broadcaster, title } = props
  return (
    <div className="AnimeInfoSection">
      <AnimeTimeInfo
        iconSrc={<BsClockFill />}
        text={`${(day || '').toUpperCase()} ${time} ${
          '| ' + broadcaster || ''
        }`}
      />
      <div className="size-24 bold title">
        <span className="text">{title}</span>
      </div>
      <style jsx>{`
        .AnimeInfoSection {
          margin: ${props.margin || '0'};
        }
        .AnimeInfoSection .title {
          font-size: 24px;
          display: flex;
          align-items: center;
          line-height: 120%;
        }
        .AnimeInfoSection .title:after {
          content: '';
          background: ${props.isOnAir ? '#50e3c2' : '#f7b955'};
          width: 9px;
          height: 9px;
          border-radius: 50%;
          margin-left: 9px;
          position: relative;
        }
        @media screen and (max-width: 568px) {
          .AnimeInfoSection .title {
            font-size: 20px;
          }
          .AnimeInfoSection .title:after {
            width: 7px;
            height: 7px;
          }
        }
      `}</style>
    </div>
  )
}
export default AnimeInfoSection
