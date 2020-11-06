import Link from 'next/link'
import ColoredButton from './ColoredButton'

const ChangeDayButton = props => {
    const isPrev = props.dayType === 'prev'

    return (
        <Link href="/[day]" as={`/${props.day}`}>
            <a className="item">
                <ColoredButton bgColor="#1abc9c" hoverBgColor="#16a085" textColor="#FFFFFF" >
                    <div className="container">
                        <img className="arrow" src="/svg/arrow-right-white-icon.svg"/>
                        <span className="text">
                            {isPrev ? 'Prev' : 'Next'}
                        </span>
                        <style jsx>{`
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
                    </div>
                </ColoredButton>
            </a>
        </Link>
    )
}
export default ChangeDayButton