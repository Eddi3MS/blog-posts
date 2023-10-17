import { useEffect, useState } from 'react'
import { DeleteModal, Pagination, SinglePost, UpdateModal } from '..'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { listPosts } from '../../redux/posts/thunks/listPosts'

function ListPosts() {
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

  const posts = useAppSelector((state) => state.posts)
  const user = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  console.log(posts.currentPage)

  useEffect(() => {
    dispatch(listPosts(posts.currentPage))
  }, [dispatch, posts.currentPage])

  return (
    <>
      <>
        {posts.loading ? (
          <span className="text-center">loading..</span>
        ) : posts.data && posts.data.length > 0 ? (
          posts.data.map(
            ({ username, title, content, created_datetime, id }, index) => (
              <SinglePost
                key={index}
                username={username}
                title={title}
                content={content}
                timestamp={created_datetime}
                showActions={username === user.username}
                handleDeleteModal={() => setDeleteModalData({ show: true, id })}
                handleUpdateModal={() =>
                  setUpdateModalData({ show: true, id, content, title })
                }
              />
            )
          )
        ) : (
          <span className="text-center">
            {posts.error?.message || 'No posts found.'}
          </span>
        )}
      </>

      <Pagination />

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

export default ListPosts
