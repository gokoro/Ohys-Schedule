const AnimeEpisodeListItem = props => {
    return (
        <div className="item">
            <div className="img item">
                <img className="rounded" src={props.imageUrl} />
                <div className="text item">
                    <div className="episode">{props.episodeName.replace('Episode ', 'Ep.')}</div>
                </div>
            </div>
            <style jsx>{`
                .item {
                    margin-bottom: 16px;
                }
                .item > .img.item {
                    position: relative;
                    width: 90%;
                    margin: 0 auto;
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
                    min-height: 40px;
                    display: flex;
                    align-items: center;
                    border-radius: 5px;
                }
                .item > .text.item .episode {
                    font-size: 12px;
                    letter-spacing: 0.3px;
                    color: #EDF1F5E8;
                    width: 100%;
                    line-height: 120%;
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
export {
    AnimeEpisodeListItem
}