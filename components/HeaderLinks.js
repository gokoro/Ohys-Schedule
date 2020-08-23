import moment from 'moment-timezone'

import ClassNameAsPathLink from './ClassNameAsPathLink'

const HeaderLinks = () => {
    const jpMoment = moment().tz('Asia/Tokyo')
    const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][jpMoment.day()]  

    return (
        <div className="wrapper">
            <DayLink day={day} text="Sun" value="sun" />
            <DayLink day={day} text="Mon" value="mon" />
            <DayLink day={day} text="Tue" value="tue" />
            <DayLink day={day} text="Wed" value="wed" />
            <DayLink day={day} text="Thu" value="thu" />
            <DayLink day={day} text="Fri" value="fri" />
            <DayLink day={day} text="Sat" value="sat" />
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
    return (<>
        <ClassNameAsPathLink activeClassName='active' href="/[day]" as={`/${props.value}`}>
            <a>
                {props.day === props.value &&
                    <div className="day">Now</div>
                }
                <div>{props.text}</div>
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
            a.active {
                border-bottom: 2px solid #000000;
                color: #000000;
            }
            a .day {
                position: relative;
                bottom: 4px;
                font-size: 10px;
                line-height: 0%;
                letter-spacing: 0.5px;
            }
        `}</style></>
    )
}


export default HeaderLinks