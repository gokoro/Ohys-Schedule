import * as React from 'react'
import Router, { useRouter } from 'next/router'

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import ColoredButton from './ColoredButton'

const ChangeDayButton = (props) => {
  const router = useRouter()
  const isPrev = props.dayType === 'prev'

  const onClick = () => {
    router.push(`/${props.day}`)
    Router.events.on('routeChangeComplete', () => scrollTo(0, 0))
  }

  const arrowStyle = { marginRight: '6px' }

  return (
    <>
      <span className="routerButton" onClick={onClick}>
        <ColoredButton
          bgColor="#1abc9c"
          hoverBgColor="#16a085"
          textColor="#FFFFFF"
        >
          <div className="container">
            {isPrev ? (
              <BsArrowLeft style={arrowStyle} />
            ) : (
              <BsArrowRight style={arrowStyle} />
            )}
            <span className="text">{isPrev ? 'Prev' : 'Next'}</span>
          </div>
        </ColoredButton>
      </span>
      <style jsx>{`
        .routerButton {
          cursor: pointer;
        }
        .container {
          flex-direction: ${isPrev ? 'row' : 'row-reverse'};
        }
      `}</style>
    </>
  )
}
export default ChangeDayButton
