import Head from 'next/head'
import { DefaultSeo, DefaultSeoProps, NextSeo, NextSeoProps } from 'next-seo'
import React from 'react'

const common = {
  title: 'Bivas Biswas - Portfilo',
  longTitle: 'Bivas Biswas - Frontend Developer',
  desc: 'Hello, 👋 I’m Bivas Biswas.I’m a Frontend Developer and trying to become a Engineer.',
  logo: 'https://www.devsnest.in/favicon.png',
  banner: 'https://www.devsnest.in/banner.svg',
  link: 'https://devsnest.in',
}

const seoConfig: DefaultSeoProps = {
  defaultTitle: common.longTitle,
  description: common.desc,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: common.logo,
    },
  ],
  additionalMetaTags: [
    {
      name: 'ahrefs-site-verification',
      content:
        'c404991c90a2500d27c3d4e5ad2b8fbe382bb1d564a74141e945c37e94758a01',
    },
  ],
  openGraph: {
    url: common.link,
    title: common.longTitle,
    description: common.desc,
    site_name: common.title,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: common.logo,
        width: 512,
        height: 512,
        alt: 'Devsnest Logo',
        type: 'image/png',
      },
      {
        url: common.banner,
        width: 1920,
        height: 1080,
        alt: 'Devsnest Banner',
        type: 'image/svg',
      },
    ],
  },
  twitter: {
    site: common.link,
    handle: '@devsnest_',
    cardType: 'summary',
  },
}

const HeadManager = (props: NextSeoProps) => {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <NextSeo {...props} />
    </>
  )
}

export default HeadManager
