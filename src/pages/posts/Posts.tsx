import { useAppSelector } from '../../redux/hooks'
import { Navigate } from 'react-router-dom'

function Posts() {
  const user = useAppSelector((state) => state.user)

  if (!user.username) {
    return <Navigate to={'/'} />
  }

  return <h1>posts page</h1>
}

export default Posts
