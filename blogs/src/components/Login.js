import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = ({ handleLogin }) => {
  const history = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    const objLogin = {
      userName,
      password
    }
    handleLogin(objLogin)
    history("/api/blogs")
    setUserName('')
    setPassword('')
  }

  return(
    <form onSubmit={login}>
      <div>
        username
        <input
          id="userName"
          type="text"
          value={userName}
          name="UserName"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login" type="submit">login</button>
    </form>
  )
}

export default Login