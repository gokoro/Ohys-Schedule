import Router, { useRouter } from 'next/router'

import ColoredButton from './ColoredButton'

const ChangeDayButton = props => {
    const router = useRouter()
    const isPrev = props.dayType === 'prev'

    const onClick = () => {
        router.push(`/${props.day}`)
        Router.events.on('routeChangeComplete', () => scrollTo(0, 0))
    }

    return (<>
        <span className="routerButton" onClick={onClick}>
            <ColoredButton bgColor="#1abc9c" hoverBgColor="#16a085" textColor="#FFFFFF" >
                <div className="container">
                    <img className="arrow" src="/svg/arrow-right-white-icon.svg"/>
                    <span className="text">
                        {isPrev ? 'Prev' : 'Next'}
                    </span>
                </div>
            </ColoredButton>
        </span>
        <style jsx>{`
            .routerButton {
                cursor: pointer;
            }
            .container {
                display: flex;
                flex-direction: ${isPrev ? 'row' : 'row-reverse'}
            }
            .arrow {
                ${isPrev && 'transform: rotate(180deg)'}
            }
            .text {
                margin-${isPrev ? 'left' : 'right'}: 6px;
                color: #FFFFFF !important;
            }
        `}</style>
    </>)
}
export default ChangeDayButton