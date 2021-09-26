import * as React from 'react'
import ShadowWhiteBox from './ShadowWhiteBox'
import Placeholder from './Placeholder'

import { LocaleMessageState } from '../states/preferredLanguage'

import { useAnime } from '../hooks/useAnime'
import { useRecoilValue } from 'recoil'
import { useState, useEffect } from 'react'

const AnimeDescriptionSection = (props) => {
  const [isButtonClicked, setButtonClicked] = useState(false)

  const locale = useRecoilValue(LocaleMessageState)

  const { data, isLoading } = useAnime(props.animeId)

  useEffect(() => {
    if (!isLoading && data.data.description.length <= 150) {
      setButtonClicked(true)
    }
  }, [isLoading])

  return (
    <ShadowWhiteBox>
      <div className="header bold size-16">
        {locale.components.animeDescriptionSection.story}
      </div>
      <div className="content">
        {isLoading ? (
          <Placeholder lineCountFor={10} />
        ) : (
          <>
            <p>
              {isButtonClicked ? (
                <>{data.data.description}</>
              ) : (
                <>{data.data.description.slice(0, 150).trim()}...</>
              )}
            </p>
            <a
              className={`moreBtn bold${isButtonClicked ? ' clicked' : ''}`}
              onClick={() => setButtonClicked(true)}
            >
              {locale.components.animeDescriptionSection.more}
            </a>
          </>
        )}
      </div>
      <style jsx>{`
        .header {
          margin-bottom: 16px;
        }
        .content {
          font-size: 12px;
          letter-spacing: 0;
        }
        .moreBtn {
          cursor: pointer;
          color: #000000;
        }
        .moreBtn:hover {
          text-decoration: underline;
        }
        .moreBtn.clicked {
          display: none;
        }
      `}</style>
    </ShadowWhiteBox>
  )
}
export default AnimeDescriptionSection
