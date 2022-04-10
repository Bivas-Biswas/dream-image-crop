import NextLink, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { HTMLAnchorProps } from '../../../interfaces'

const Link = ({
  href,
  children,
  className = '',
  activeClassName = 'bg-blue-100',
  ...props
}: HTMLAnchorProps &
  React.PropsWithChildren<LinkProps> & { activeClassName?: string }) => {
  const router = useRouter()

  const isActive = router.route === href
  const finalClassName = className + (isActive ? `${activeClassName}` : '')

  return (
    <NextLink href={href || ''}>
      <a href={href || ''} {...props} className={finalClassName}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
