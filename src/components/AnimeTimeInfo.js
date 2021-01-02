import { BsClockFill } from 'react-icons/bs'

const AnimeTimeInfo = props => {
    return (
        <div className="AnimeTimeInfo time bold">
            <BsClockFill 
                size={13}
                style={{ marginRight: '6px' }}
                color="black"
            />
            <span>{props.text}</span>
            <style jsx>{`
                .time {
                    margin-bottom: 6px;
                    font-size: 13.8px;
                    letter-spacing: 1px;
                    color: #7f8c8d;
                }
                @media screen and (max-width: 568px) {
                    .time {
                        font-size: 10px;
                        margin-bottom: 0;
                    }
                    .time svg {
                        width: 8px!important;
                        height: 8px!important;
                    }
                }
            `}</style>
        </div>
    )
}
export default AnimeTimeInfo