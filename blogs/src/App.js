import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom"
import Blog from './components/Blog'
import SuccessError from './components/SuccessError'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { notification } from "./reducers/notificationReducer"
import { addNewBlog, getAll } from "./reducers/blogReducer"
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import Login from './components/Login'
import BlogId from './components/BlogId'


const App = () => {

  // const [blogs, setBlogs] = useState([])
  // const [userName, setUserName] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogRef = useRef()
  const resp = useSelector(state => state.notification)
  const blog = useSelector(state => state.blog)
  const dispatch = useDispatch()

  useEffect(() => {
    update()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (obj) => {
    try {
      let userName = obj.userName
      let password = obj.password
      const userLogin = await loginService.login({
        userName, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(userLogin)
      )
      blogService.setToken(userLogin.token)
      setUser(userLogin)
      console.log(user)
      dispatch(notification('Sesion successful',5))
    } catch (exception) {
      dispatch(notification('Please provide a valid email address and password',5))
      console.log(exception)

    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  const update = () => {
    dispatch(getAll())
    console.log(blog)
  }
  const addBlog = (blogObject) => {
    blogRef.current.toggableVisibility()
    dispatch(addNewBlog(blogObject))
    update()
    // console.log(blogAdd)
    // const newCreateBlog = await blogService.create(blogObject)
    // setBlogs(blogAdd)
    if(blog) {
      dispatch(notification('blog added'))
    } else {
      dispatch(notification("error, the blog can't insert"))
    }
  }

  const loginForm = () => (
    <>
      <SuccessError errorMessage={resp} successMessage={''} />
      <Login handleLogin={handleLogin} />
    </>
  )
  const blogForm = (user) => {
    return (
      <>
        <SuccessError successMessage={resp} errorMessage={''}/>
        <span><strong>{user} </strong></span>
        <button onClick={handleLogout}>logout</button><br/><br/>
        <Togglable buttonLabel='newBlog' ref={blogRef} btn={'New blog'}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          <ul id="list">
            {blog.map((response) =>
              <Blog
                key={response.id}
                objBlog={response}
                id={response.id}
              />
            )}
          </ul>
        </div>
      </>
    )
  }
  console.log(blog.response)
  return (
    <Router>
      <h1>blogs</h1>
      <Routes>
        <Route path="/" element={loginForm()} />
        <Route path="/api/blogs" element={ user === null ? loginForm() : blogForm() } />
        <Route path="/api/blogs/:id" element={<BlogId blogs={blog} />} />
      </Routes>
      <div>
      </div>
    </Router>
  )
}
export default App
