import '../styles/index.css'
import HeadManager from '../components/Theme/HeadManger/HeadManger'
import { AppProps } from '../interfaces'
import { Layout } from '../components'

import withTwindApp from '@twind/next/shim/app'
import twindConfig from './../config/twind.config'

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
