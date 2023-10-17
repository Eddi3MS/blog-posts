import { AxiosError } from 'axios'
import { Button, Input, Textarea } from '..'
import { PostsServices } from '../../actions/postsServices/postServices'
import { ErrorHandling } from '../../errors'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './styles.css'
import { useState } from 'react'
import { setError } from '../../redux/error/errorSlice'
import { createPost } from '../../redux/posts/postsSlice'

const postDataInitial = {
  title: '',
  content: '',
}

function CreatePost() {
  const [postData, setPostData] = useState(postDataInitial)

  const username = useAppSelector((state) => state.user.username)
  const dispatch = useAppDispatch()

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }))
  }

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
      setPostData(postDataInitial)
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
          onChange={handleChange}
        />
        <Textarea
          rows={3}
          placeholder="Content Here"
          label="Content"
          name="content"
          value={postData.content}
          onChange={handleChange}
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
