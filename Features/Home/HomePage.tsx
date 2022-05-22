import React from 'react'

import { HeaderSection, ProjectCard } from './components'
import { projectItemstData } from './data'

const HomePage = () => {
  return (
    <div>
      <HeaderSection />
      <div>
        <div className="px-3 pb-1 sm:px-14 sm:pb-3">Main Section</div>
        <div className="mx-2 lg:mx-0 space-y-5">
          {projectItemstData.map((item) => (
            <ProjectCard key={item.projectId} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
