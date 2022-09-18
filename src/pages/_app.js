import * as React from 'react'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress/nprogress'
import Script from 'next/script'

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
      <Script
        strategy="worker"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.googleAnalyticsTag}`}
      />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.googleAnalyticsTag}', { 
                page_path: window.location.pathname,
            });
        `,
        }}
      />
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  )
}

export default MyApp
