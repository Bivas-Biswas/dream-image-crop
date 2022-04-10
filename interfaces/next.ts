import type { LayoutProps } from 'components'
import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'
import type { NextSeoProps } from 'next-seo'
import { ReactElement } from 'react'

export type AppPage = NextPage & {
  (): ReactElement
  layout?: LayoutProps
  seo?: NextSeoProps
}

export type AppProps = NextAppProps & {
  Component: AppPage
}
