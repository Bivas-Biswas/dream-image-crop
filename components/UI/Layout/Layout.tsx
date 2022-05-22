import NextProgress from 'nextjs-progressbar'
import React from 'react'
import { tw } from 'twind'

import { HTMLDivProps } from '../../../interfaces'
import { Footer } from '../Footer'
import Navbar from '../Navbar'

export type LayoutProps = {
  children?: React.ReactNode | React.ReactNode[]
  hideFooter?: boolean
  hideNavbar?: boolean
  pageClassName?: string
  /**
   * If height of this page should be equal to screen height
   */
  screenHeight?: boolean
} & HTMLDivProps

const Layout = ({
  children,
  hideFooter,
  hideNavbar,
  className,
  pageClassName,
  screenHeight,
  ...props
}: LayoutProps) => {
  return (
    <div className={tw('bg-gray-50', className)} {...props}>
      <div className={tw('flex flex-col', screenHeight && 'max-h-screen')}>
        {!hideNavbar && <Navbar />}

        <NextProgress
          color="#8080FF"
          startPosition={0.3}
          stopDelayMs={0}
          height={3}
          showOnShallow={true}
          nonce={''}
          options={null}
        />

        <div
          className={tw(
            'flex-1 flex flex-col max-w-5xl w-full mx-auto',
            pageClassName
          )}
        >
          {children}
        </div>
      </div>

      {!hideFooter && <Footer />}
    </div>
  )
}

export default Layout
