import * as React from 'react'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress/nprogress'
import Script from 'next/script'
import Head from 'next/head'
import { Partytown } from '@builder.io/partytown/react'

import Router from 'next/router'
import { RecoilRoot } from 'recoil'

import Layout from '../components/Layout'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

NProgress.settings.showSpinner = false

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          type="text/partytown"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.googleAnalyticsTag}`}
        />
        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                forward: ['dataLayer.push'],
                debug: true
              };
            `,
          }}
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.googleAnalyticsTag}');
            `,
          }}
        />
      </Head>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  )
}

export default MyApp
