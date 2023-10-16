import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { PostsServices } from '../../actions/postsServices/postServices'
import { CreatePost, SinglePost } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { listPosts } from '../../redux/posts/thunks/listPosts'
import './styles.css'

function Posts() {
  const user = useAppSelector((state) => state.user)
  const posts = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(listPosts())
  }, [dispatch])

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
          PostsServices.delete('66382')
        }}
      >
        delete post
      </button>

      <div>
        <CreatePost />

        {posts.loading
          ? 'loading..'
          : posts.data
          ? posts.data.map(({ username, title, content, timestamp }, index) => (
              <SinglePost
                key={index}
                username={username}
                title={title}
                content={content}
                timestamp={timestamp}
                showActions={username === user.username}
              />
            ))
          : posts.error
          ? posts.error?.message
          : null}
      </div>
    </section>
  )
}

export default Posts
