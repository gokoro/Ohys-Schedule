import { useRecoilValue } from 'recoil'
import { useAnime } from '../hooks/useAnime'
import { LocaleMessageState } from '../states/preferredLanguage'
import Placeholder from './Placeholder'
import ShadowWhiteBox from './ShadowWhiteBox'

const AnimeTorrentOtherLink = (props) => {
  const locale = useRecoilValue(LocaleMessageState)

  const res = useAnime(props.animeId)
  const data = res.data

  return (
    <ShadowWhiteBox className="anime-torrent-other-link">
      <div className="header bold size-18">
        {locale.components.animeTorrentOtherLink.externalLinks}
      </div>
      <div className="content">
        {res.isLoading ? (
          <Placeholder lineCountFor={2} />
        ) : (
          <div className="links">
            <ExternalLinkItem
              text="Mirror"
              href={`https://cryental.dev/services/anime/?search=${data.data.name}`}
            />
            <ExternalLinkItem
              text="Nyaa"
              href={`https://nyaa.si/user/ohys?f=0&c=0_0&q=${data.data.name}`}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .header {
          margin-bottom: 24px;
        }
        @media screen and (max-width: 568px) {
          .links {
            display: flex;
            justify-content: space-between;
          }
        }
      `}</style>
    </ShadowWhiteBox>
  )
}
const ExternalLinkItem = (props) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="rounded bold item"
      href={props.href}
    >
      {props.text}
      <style jsx>{`
        .item {
          font-size: 15px;
          padding: 8px 16px;
          background-color: #e0e1e2;
          color: rgba(0, 0, 0, 0.6);
          margin-right: 10px;
          transition: background-color 0.1s;
        }
        .item:hover {
          background-color: #cacbcd;
        }
        @media screen and (max-width: 568px) {
          .item {
            margin-right: 0;
          }
        }
      `}</style>
    </a>
  )
}
export default AnimeTorrentOtherLink
