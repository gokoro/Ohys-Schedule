import moment from 'moment-timezone'

import ClassNameAsPathLink from './ClassNameAsPathLink'

import LanguageContext from '../context/LanguageContext'

import { useContext } from 'react'

const HeaderLinks = () => {
    const { locale: { 
        common: {
            day: dayLocaleSet
        }
    } } = useContext(LanguageContext.Original)

    const jpMoment = moment().tz('Asia/Tokyo')
    const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][jpMoment.day()]  

    return (
        <div className="wrapper">
            <DayLink day={day} text={dayLocaleSet.sun} value="sun" />
            <DayLink day={day} text={dayLocaleSet.mon} value="mon" />
            <DayLink day={day} text={dayLocaleSet.tue} value="tue" />
            <DayLink day={day} text={dayLocaleSet.wed} value="wed" />
            <DayLink day={day} text={dayLocaleSet.thu} value="thu" />
            <DayLink day={day} text={dayLocaleSet.fri} value="fri" />
            <DayLink day={day} text={dayLocaleSet.sat} value="sat" />
            <style jsx>{`
                .wrapper {
                    width: 100%;
                    display: flex;
                }
            `}</style>
        </div>
    )
}
const DayLink = props => {
    const { locale } = useContext(LanguageContext.Original)

    return (<>
        <ClassNameAsPathLink activeClassName='active' href="/[day]" as={`/${props.value}`}>
            <a>
                {props.day === props.value &&
                    <div className="day">{locale.components.header.now}</div>
                }
                <div className={props.day === props.value && 'todayActive'}>{props.text}</div>
            </a>
        </ClassNameAsPathLink>
        <style jsx>{`
            a {
                flex: 1;
                display: inline-block;
                cursor: pointer;
                font-size: 15px;
                transition: all 0.05s ease-in;
                outline: 0;
                text-align: center;
                padding: 12px 0;
                height: fit-content;
                letter-spacing: 0;
                color: var(--sub-text-color);
            }
            .day {
                position: relative;
                bottom: 4px;
                font-size: 10px;
                line-height: 0%;
                letter-spacing: 0.5px;
                color: #000000;
                font-weight: bold;
            }
            .todayActive {
                color: #000000;
                font-weight: bold;
            }
            .active {
                border-bottom: 2px solid #6c5ce7;
                color: #6c5ce7;
                font-weight: bold;
            }
            .active .day, .active .todayActive {
                color: #6c5ce7;
            }
        `}</style></>
    )
}


export default HeaderLinks