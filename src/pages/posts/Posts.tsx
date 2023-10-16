import { Navigate } from 'react-router-dom'
import { CreatePost } from '../../components'
import { useAppSelector } from '../../redux/hooks'
import './styles.css'
import { PostsServices } from '../../actions/postsServices/postServices'

function Posts() {
  const user = useAppSelector((state) => state.user)

  if (!user.username) {
    return <Navigate to={'/'} />
  }

  return (
    <section className="posts_container">
      <header>
        <h1 className="text-xl">CodeLeap Network</h1>
      </header>

      <button
        onClick={() => {
          PostsServices.delete('66377')
        }}
      >
        delete post
      </button>

      <div>
        <CreatePost />
        {/* list */}
      </div>
    </section>
  )
}

export default Posts
