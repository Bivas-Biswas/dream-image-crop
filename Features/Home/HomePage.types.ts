export type techStackType = {
  id: number
  name: string
  logo: string
}

export type projectItemType = {
  projectId: number
  projectName: string
  content: string
  projectHostLink: string
  projectLogo: string
  github_repo_link: string
  likes: number
  color: string
  techStack: techStackType[]
  projectType: 'frontend' | 'backend' | 'fullstack'
}

export type projectItemsType = projectItemType[]
