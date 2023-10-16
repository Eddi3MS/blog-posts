import { Button, Input } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { login } from '../../redux/user/userSlice'
import { Navigate } from 'react-router-dom'
import './styles.css'
import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(login({ username }))
  }

  if (user.username) {
    return <Navigate to={'/posts'} />
  }

  return (
    <div className="login_container">
      <h1 className="text-xl">Welcome to CodeLeap network!</h1>
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          label="Please enter your user name"
          placeholder="John Doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" variant="primary" disabled={!username}>
          ENTER
        </Button>
      </form>
    </div>
  )
}

export default Login
