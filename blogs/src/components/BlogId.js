import { useParams } from "react-router-dom"
const BlogId = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(listblog => listblog.id === Number(id))
  return(
    <>
      <h1><strong>{blog.title}</strong></h1>
      <ul>
        <li>AUTHOR: {blog.author}</li>
        <li>INFO: {blog.url}</li>
        <li>VOTES: {blog.likes}</li>
      </ul>
    </>
  )
}

export default BlogId