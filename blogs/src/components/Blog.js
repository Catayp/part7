import { Link } from "react-router-dom"
import { updateBlog, dropBlog } from "../reducers/blogReducer"
import { notification } from "../reducers/notificationReducer"
import { useSelector, useDispatch } from 'react-redux'

const Blog = ({ objBlog, id }) => {
  const blog = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const updateLike  = (id) => {
    const objLike = blog.find(blog => blog.id === id)
    console.log(objLike)
    const updLike={ ...objLike }
    updLike.likes++
    console.log(updLike)
    dispatch(updateBlog(id, updLike))
    blog
      ? dispatch(notification('+1 like'))
      : dispatch(notification('error al'))
  }

  const deleteBlog = (id) => {
    dispatch(dropBlog(id))
    blog
      ? dispatch(notification('blog delete'))
      : dispatch(notification('error'))
  }
  return(
    <li>
      <Link to={`/api/blogs/${id}`}>{objBlog.title}</Link>
       - {objBlog.author}
      <button id="like" onClick={()=>{updateLike(id)}}>
        like
      </button>
      <button id="deleteBlog" onClick={()=>deleteBlog(id)} >
        Delete
      </button>
    </li>
  )
}
export default Blog