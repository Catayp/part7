import userService from '../services/users'

export const getAll = () => {
  return async dispatch => {
    const list = await userService.getAll()
    dispatch({
      type: "ALL",
      data: list
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