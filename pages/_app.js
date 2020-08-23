import "../styles/globals.css"
import 'nprogress/nprogress.css'
import NProgress from 'nprogress/nprogress'

import Router from 'next/router'

import LanguageContext from '../context/LanguageContext'
import ListTypeContext from '../context/ListTypeContext'

import Layout from "../components/Layout"

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

NProgress.settings.showSpinner = false

function MyApp({ Component, pageProps }) {
  return (
    <LanguageContext.Provider>
      <ListTypeContext.Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ListTypeContext.Provider>
    </LanguageContext.Provider>
  )
}

export default MyApp
