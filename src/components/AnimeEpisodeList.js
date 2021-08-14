import * as React from 'react'

const AnimeEpisodeListItem = ({ episodeName, imageUrl, ...props }) => {
  return (
    <div className="item" {...props}>
      <div className="img item">
        <img className="rounded" src={imageUrl} />
        <div className="text item">
          <div className="episode">
            {episodeName.replace('Episode ', 'Ep.')}
          </div>
        </div>
      </div>
      <style jsx>{`
        .item > .img.item {
          position: relative;
        }
        .item > .img.item img {
          width: 100%;
          border-radius: 3px;
        }
        .item > .text.item {
          position: absolute;
          bottom: 0;
          background-color: rgb(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          margin: 0;
          padding: 4px 10px;
          width: 100%;
          height: 30%;
          display: flex;
          align-items: center;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .item > .text.item .episode {
          font-size: 12px;
          letter-spacing: 0.3px;
          color: #edf1f5e8;
          width: 100%;
          line-height: 120%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media screen and (max-width: 568px) {
          .item > .text.item {
            position: relative;
            border-radius: 0;
          }
          .item > .text.item .episode {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
}
export { AnimeEpisodeListItem }
