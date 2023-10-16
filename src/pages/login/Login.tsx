import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { login } from '../../redux/user/userSlice'
import { Navigate } from 'react-router-dom'

function Login() {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  if (user.username) {
    return <Navigate to={'/posts'} />
  }

  return (
    <div>
      <h1>login page</h1>

      <button onClick={() => dispatch(login({ username: 'eddi3ms' }))}>
        login
      </button>
    </div>
  )
}

export default Login
