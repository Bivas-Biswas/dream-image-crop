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
  return <div>Blog - {blogId}</div>
}

export default Blog
