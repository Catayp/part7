import loginService from '../services/login'

export const loginUser = (userName, password) => {
  return async dispatch => {
    const user = await loginService.login({ userName, password })
    console.log(user)
    dispatch({
      type: "LOGIN",
      data: user
    })
  }
}
// export const setUsers = (user) => {
//   return async dispatch => {
//     dispatch({
//       type: "SETUSER",
//       data: user
//     })
//   }
// }

const userReducer = (state, action) => {
  switch (action.type) {
  case "LOGIN":
    return action.data
  case "SETUSER":
    return action.data
  default:
    return null
  }
}

export default userReducer