import React from 'react'

import Link from '../../../components/Misc/Link'
import {
  GithubIcon,
  GmailIcon,
  LinkedInIcon,
  ResumeIcon,
  TwitterIcon,
} from '../assets/Icons'

type IconType = {
  id: number
  label: string
  // eslint-disable-next-line no-undef,no-unused-vars
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  link: string
}

type IconsType = IconType[]

const IconsList: IconsType = [
  {
    id: 1,
    label: 'github',
    icon: GithubIcon,
    link: 'https://github.com/Bivas-Biswas',
  },
  {
    id: 2,
    label: 'twitter',
    icon: TwitterIcon,
    link: 'https://twitter.com/bivasbiswas99',
  },
  {
    id: 3,
    label: 'linkedin ',
    icon: LinkedInIcon,
    link: 'https://www.linkedin.com/in/bivas-biswas-828a731b7/',
  },
  {
    id: 4,
    label: 'gmail',
    icon: GmailIcon,
    link: 'mailto:bivasbiswas1999@gmail.com',
  },
  {
    id: 5,
    label: 'resume',
    icon: ResumeIcon,
    link: 'https://drive.google.com/file/d/1_P9kzOrFuTEK-0MyZG39rWPVvfpGsgyx/view',
  },
]
const Header = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="px-3 pb-1 sm:px-14 sm:pb-3">
        <div>
          <p className="text-5xl sm:text-5xl">
            Hello, 👋 I’m{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-fuchsia-600">
              {' '}
              Bivas Biswas.
            </span>
          </p>
          <p className="text-xl sm:text-2xl mt-4 sm:mt-6">
            a{' '}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#55ACEE] to-[#61DAFB]">
              Frontend Developer
            </span>{' '}
            and hustling to <br />
            become a <span className="font-medium">Engineer</span>.
          </p>
        </div>
        <div className="flex flex-row mt-5 sm:mt-7 mb-4 sm:mb-6 space-x-4">
          {IconsList.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              target="_blank"
              rel="noreferrer noopener"
              className="transition ease-in-out sm:hover:-translate-y-1 sm:hover:scale-110 duration-300"
            >
              {<item.icon className="w-7 h-7 sm:w-9 sm:h-9" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
