import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SetAnimeListTypeComponent } from '../states/animeListType'
import { RefreshCurrentTimeComponent } from '../states/currentTime'
import { SetPreferredLanguageComponent } from '../states/preferredLanguage'
import Header from './Header'
import Helmet from './Helmet'

const Layout = (props) => {
  const { asPath } = useRouter()

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://ohys.gokoro.me${asPath}`} />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/images/logo.jpg" />
        <meta property="og:site_name" content="Ohys-Schedule" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ohys.gokoro.me${asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Ohys-Schedule" />
        <link rel="dns-prefetch" href={process.env.apiUrl} />
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain="ohys.gokoro.me"
            src="/js/plausible.js"
          />
        )}
      </Head>
      <Helmet
        title="Ohys-Schedule"
        description="The Schedule of the animes that Ohys releases."
      />
      <RefreshCurrentTimeComponent />
      <SetPreferredLanguageComponent />
      <SetAnimeListTypeComponent />
      <Header />
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <main className="main-section">
              <div className="main-wrapper">{props.children}</div>
            </main>
          </div>
        </div>
      </div>
      <style jsx>{`
        .content {
          width: var(--wrapper-size);
          margin: 0 auto;
          padding: 0 14px;
        }
        .container {
          display: flex;
        }
        .container .main-section {
          flex: 1 1 0%;
        }
        .container .main-section .main-wrapper {
          margin-top: 48px;
        }
        @media screen and (max-width: 1080px) {
          .content {
            width: var(--mobile-wrapper-size);
          }
        }
        @media screen and (max-width: 568px) {
          .container .main-section .main-wrapper {
            margin-top: 30px;
          }
        }
      `}</style>
    </>
  )
}
export default Layout
