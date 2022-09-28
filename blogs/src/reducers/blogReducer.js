import blogService from '../services/blogs'

export const addNewBlog = (blog) => {
  return async dispatch => {
    const obj = await blogService.create(blog)
    dispatch({
      type: "ADD",
      data: obj
    })
  }
}
export const getAll = () => {
  return async dispatch => {
    const list = await blogService.getAll()
    dispatch({
      type: "ALL",
      data: list
    })
  }
}
export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)
    const list = await blogService.getAll()
    dispatch({
      type: 'ALL',
      data: list
    })
  }
}
export const dropBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    const obj = await blogService.getAll()
    dispatch({
      type: 'ALL',
      data: obj
    })
  }
}
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "ADD":
    return state.concat(action.data)
  case "ALL":
    return action.data
  default:
    return state
  }
}

export default blogReducer