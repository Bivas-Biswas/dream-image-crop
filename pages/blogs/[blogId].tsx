import { useRouter } from 'next/router'
import React from 'react'

// Urls Params
/**
 * how-to-start-react-{id}
 *
 */
const Blog = () => {
  const router = useRouter()
  const { blogId } = router.query
  return (
    <div>
      <div className="px-3 pb-1 sm:px-8 sm:pb-3">
        <div>Blog - {blogId}</div>
      </div>
    </div>
  )
}

export default Blog
