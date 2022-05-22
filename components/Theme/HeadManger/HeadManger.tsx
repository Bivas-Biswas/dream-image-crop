import { DefaultSeo, DefaultSeoProps, NextSeo, NextSeoProps } from 'next-seo'
import React from 'react'

const common = {
  title: 'Bivas Biswas - Portfilo',
  longTitle: 'Bivas Biswas - Frontend Developer',
  desc: 'Hello, 👋 I’m Bivas Biswas.I’m a Frontend Developer and trying to become a Engineer.',
  logo: '',
  banner: '',
  link: '',
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
      },
    ],
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
