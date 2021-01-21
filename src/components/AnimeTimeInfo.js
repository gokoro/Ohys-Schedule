const AnimeTimeInfo = (props) => {
  return (
    <div className="AnimeTimeInfo time bold">
      <span className="icon-container">{props.iconSrc}</span>
      <span>{props.text}</span>
      <style jsx>{`
        .time {
          margin-bottom: 6px;
          font-size: 13.8px;
          letter-spacing: 1px;
          color: #7f8c8d;
        }
        .icon-container {
          font-size: 12px;
          margin-right: 6px;
          color: black;
        }
        @media screen and (max-width: 568px) {
          .time {
            font-size: 10px;
            margin-bottom: 0;
          }
          .icon-container {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
}
export default AnimeTimeInfo
