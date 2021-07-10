import * as React from 'react'
import ChangeDayButton from './ChangeDayButton'

const ChangeDayButtonContainer = (props) => {
  return (
    <div className="container">
      <ChangeDayButton day={props.prevDay} dayType="prev" />
      <ChangeDayButton day={props.nextDay} dayType="next" />
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}
export default ChangeDayButtonContainer
