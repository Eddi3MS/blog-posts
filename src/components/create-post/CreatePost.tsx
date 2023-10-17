import { AxiosError } from 'axios'
import { Button, Input, Textarea } from '..'
import { PostsServices } from '../../actions/postsServices/postServices'
import { ErrorHandling } from '../../errors'
import { usePostData } from '../../hooks'
import { setError } from '../../redux/error/errorSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { createPost } from '../../redux/posts/postsSlice'
import './styles.css'

function CreatePost() {
  const { handleChangePostData, handleClearPostData, postData } = usePostData()

  const username = useAppSelector((state) => state.user.username)
  const dispatch = useAppDispatch()

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username) return

    const data = {
      ...postData,
      username,
    }

    try {
      const res = await PostsServices.create(data)
      dispatch(createPost(res.data))
      handleClearPostData()
    } catch (error) {
      const errorHandling = new ErrorHandling(error as AxiosError)
      dispatch(setError({ error: errorHandling.error.message }))
    }
  }

  return (
    <div className="create_post_wrapper">
      <h2 className="text-xl">What's on your mind?</h2>

      <form onSubmit={handleCreatePost}>
        <Input
          type="text"
          label="Title"
          name="title"
          placeholder="Hello World"
          value={postData.title}
          onChange={handleChangePostData}
        />
        <Textarea
          rows={3}
          placeholder="Content Here"
          label="Content"
          name="content"
          value={postData.content}
          onChange={handleChangePostData}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={!postData.title || !postData.content}
        >
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreatePost
