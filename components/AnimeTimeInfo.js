const AnimeTimeInfo = props => {
    return (
        <div className="AnimeTimeInfo time bold">
            <img src={props.iconSrc} />
            <span>{props.text}</span>
            <style jsx>{`
                .time {
                    display: flex;
                    margin-bottom: 6px;
                    font-size: 13.8px;
                    letter-spacing: 1px;
                    color: #7f8c8d;
                    font-family: Lato;
                }
                .time img {
                    width: 13px;
                    margin-right: 6px;
                }
                @media screen and (max-width: 568px) {
                    .time {
                        font-size: 10px;
                        margin-bottom: 0;
                    }
                    .time img {
                        width: 8px;
                    }
                }
            `}</style>
        </div>
    )
}
export default AnimeTimeInfo