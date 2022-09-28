let time
export const notification = (messagge, number=3) => {
  number = number*1000
  return async dispatch => {
    dispatch({
      type: 'notification',
      messagge
    })
    clearTimeout(time)
    time = setTimeout(() => {
      dispatch({ type: 'notification', messagge: null })
    }, number)
  }
}
const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'notification':
    return action.messagge
  default:
    return state
  }
}
export default notificationReducer