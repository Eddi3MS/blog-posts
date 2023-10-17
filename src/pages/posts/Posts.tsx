import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CreatePost,
  DeleteModal,
  SinglePost,
  UpdateModal,
} from '../../components'
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
  const [updateModalData, setUpdateModalData] = useState({
    show: false,
    id: -1,
    title: '',
    content: '',
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

          {posts.loading ? (
            <span className="text-center">loading..</span>
          ) : posts.data ? (
            posts.data.map(
              ({ username, title, content, created_datetime, id }, index) => (
                <SinglePost
                  key={index}
                  username={username}
                  title={title}
                  content={content}
                  timestamp={created_datetime}
                  showActions={username === user.username}
                  handleDeleteModal={() =>
                    setDeleteModalData({ show: true, id })
                  }
                  handleUpdateModal={() =>
                    setUpdateModalData({ show: true, id, content, title })
                  }
                />
              )
            )
          ) : posts.error ? (
            <span className="text-center">{posts.error?.message}</span>
          ) : null}
        </div>
      </section>

      {deleteModalData.show ? (
        <DeleteModal
          open={deleteModalData.show}
          onOpenChange={() => setDeleteModalData({ show: false, id: -1 })}
          postId={deleteModalData.id}
        />
      ) : null}

      {updateModalData.show ? (
        <UpdateModal
          open={updateModalData.show}
          onOpenChange={() =>
            setUpdateModalData({ show: false, id: -1, content: '', title: '' })
          }
          postId={updateModalData.id}
          content={updateModalData.content}
          title={updateModalData.title}
        />
      ) : null}
    </>
  )
}

export default Posts
