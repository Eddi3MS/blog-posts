import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CreatePost, SinglePost } from '../../components'
import DeleteModal from '../../components/delete-modal/DeleteModal'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { listPosts } from '../../redux/posts/thunks/listPosts'
import './styles.css'

function Posts() {
  const user = useAppSelector((state) => state.user)
  const posts = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()
  const [deleteModalData, setDeleteModalData] = useState({
    show: false,
    id: -1,
  })

  useEffect(() => {
    dispatch(listPosts())
  }, [dispatch])

  if (!user.username) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <section className="posts_container">
        <header>
          <h1 className="text-xl">CodeLeap Network</h1>
        </header>

        <div>
          <CreatePost />

          {posts.loading
            ? 'loading..'
            : posts.data
            ? posts.data.map(
                ({ username, title, content, timestamp, id }, index) => (
                  <SinglePost
                    key={index}
                    username={username}
                    title={title}
                    content={content}
                    timestamp={timestamp}
                    showActions={username === user.username}
                    handleDeleteModal={() =>
                      setDeleteModalData({ show: true, id })
                    }
                  />
                )
              )
            : posts.error
            ? posts.error?.message
            : null}
        </div>
      </section>

      {deleteModalData.show ? (
        <DeleteModal
          open={deleteModalData.show}
          onOpenChange={() => setDeleteModalData({ show: false, id: -1 })}
          postId={deleteModalData.id}
        />
      ) : null}
    </>
  )
}

export default Posts
