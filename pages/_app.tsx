import React from 'react'

import withTwindApp from '@twind/next/shim/app'

import { Layout } from '../components'
import HeadManager from '../components/Theme/HeadManger/HeadManger'
import { AppProps } from '../interfaces'

import twindConfig from './../config/twind.config'

import '../styles/index.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <HeadManager {...(Component.seo || {})} />
      <Layout {...(Component.layout || {})}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default withTwindApp(twindConfig, App)
