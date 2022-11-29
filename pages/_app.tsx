import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {

  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
      <meta name="description" content="description of your project" />
      <meta name="theme-color" content="#000" />
      <title>ToDo</title>
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/icon-192x192.png" />
      <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
    </Head>
    <Component {...pageProps} />
  </>


}

export default MyApp