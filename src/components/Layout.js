import { useRouter } from 'next/router'

import Head from 'next/head'
import Header from './Header'
import Sidebar from './Sidebar'
import Helmet from './Helmet'

import { RefreshCurrentTimeComponent } from '../states/currentTime'
import { SetPreferredLanguageComponent } from '../states/preferredLanguage'
import { SetAnimeListTypeComponent } from '../states/animeListType'

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
            <aside className="side-section">
              <Sidebar />
            </aside>
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
        .container .side-section {
          width: 20%;
          margin-right: 28px;
          z-index: 0;
        }
        @media screen and (max-width: 1080px) {
          .content {
            width: var(--mobile-wrapper-size);
          }
          .container .side-section {
            display: none;
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
