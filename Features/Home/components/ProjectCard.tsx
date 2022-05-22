import Link from 'components/Misc/Link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import {
  GitHubLogoIcon,
  HeartFilledIcon,
  HeartIcon,
} from '@radix-ui/react-icons'

import { projectItemType } from '../HomePage.types'

export type ProjectCardProps = projectItemType

type LikeStateType = {
  clicked: boolean
  count: number
}

const ProjectCard = (props: ProjectCardProps) => {
  const {
    projectId,
    projectName,
    content,
    projectLogo,
    projectHostLink,
    github_repo_link,
    likes,
    color,
    techStack,
    projectType,
  } = props
  const router = useRouter()
  const [likeCount, setLikeCount] = useState<LikeStateType>({
    clicked: false,
    count: likes,
  })
  const handleLikeCount = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (!likeCount.clicked) {
      setLikeCount({
        clicked: true,
        count: likeCount.count + 1,
      })
      return
    }
    setLikeCount({
      clicked: false,
      count: likeCount.count - 1,
    })
  }
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => window.open(projectHostLink, '_blank')}
    >
      <div className="absolute w-full h-full bg-gray-300 top-0 left-0 z-0 rounded-xl" />
      <div className="relative w-full h-full pb-1 pr-1 rounded-xl">
        <div className="relative group">
          <div className="absolute rounded-xl w-full transition-all ease-in-out delay-150 md:group-hover:w-[70%] h-full bg-gray-100 top-0 left-0 duration-300"></div>
          <div className="relative px-3 py-3 sm:px-12 sm:py-8 flex sm:flex-row flex-col sm:space-x-16 md:space-x-24 z-10 rounded-xl">
            <div className="flex flex-col">
              <h1 className="text-5xl md:text-6xl">{projectName}</h1>
              <p className="text-lg mt-3.5 sm:mt-6 w-full lg:w-5/6">
                {content}
              </p>
              <div>
                <div className="z-40 text-base sm:text-xl flex flex-row justify-between mt-5 sm:mt-8">
                  <div
                    className="relative select-none"
                    onClick={handleLikeCount}
                  >
                    {likeCount.clicked ? (
                      <HeartFilledIcon className="h-6 sm:h-7 w-6 sm:w-7 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 sm:h-7 w-6 sm:w-7" />
                    )}
                    <span className="absolute -top-4 ml-7">
                      {likeCount.count}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <Link
                      href={github_repo_link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="transition-all ease-in-out delay-100 md:invisible group-hover:visible hover:underline duration-300"
                    >
                      <p>Go to Repo</p>
                    </Link>
                    <div className="ml-2">
                      <GitHubLogoIcon className="h-6 sm:h-7 w-6 sm:w-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-end">
              <div className="h-full flex flex-col justify-between sm:items-center mt-5">
                <div className="w-48 hidden sm:block">
                  <img src={projectLogo} alt={`${projectName} logo`} />
                </div>
                <div className="flex flex-row sm:flex-col justify-between sm:items-center">
                  <p>Made with</p>
                  <div className="flex flex-row space-x-3">
                    {techStack.map((item) => (
                      <div key={item.id} className="h-6 sm:h-10">
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className="h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
