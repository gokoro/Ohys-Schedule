import * as React from 'react'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress/nprogress'

import * as gtag from '../lib/gtag'

import Router from 'next/router'
import { RecoilRoot } from 'recoil'

import Layout from '../components/Layout'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

NProgress.settings.showSpinner = false

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
