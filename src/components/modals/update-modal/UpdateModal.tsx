import { AxiosError } from 'axios'
import { Input, Textarea } from '../..'
import { PostsServices } from '../../../actions/postsServices/postServices'
import { ErrorHandling } from '../../../errors'
import { usePostData } from '../../../hooks'
import { setError } from '../../../redux/error/errorSlice'
import { useAppDispatch } from '../../../redux/hooks'
import { updatePost } from '../../../redux/posts/postsSlice'
import Modal from '../modal'
import './styles.css'

interface UpdateModalProps {
  open: boolean
  onOpenChange: VoidFunction
  postId: number
  title: string
  content: string
}

function UpdateModal({
  postId,
  onOpenChange,
  content,
  title,
  ...rest
}: UpdateModalProps) {
  const { handleChangePostData, postData } = usePostData(content, title)

  const dispatch = useAppDispatch()

  const handleUpdatePost = async () => {
    try {
      await PostsServices.update(postId, postData)
      dispatch(
        updatePost({
          id: postId,
          content: postData.content,
          title: postData.title,
        })
      )
    } catch (error) {
      const errorHandling = new ErrorHandling(error as AxiosError)
      dispatch(setError({ error: errorHandling.error.message }))
    }
  }

  return (
    <Modal {...rest} onOpenChange={onOpenChange}>
      <Modal.Overlay onClick={onOpenChange} />
      <Modal.Content>
        <Modal.Title className="text-xl">Edit post</Modal.Title>

        <div className="update_modal_form">
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
        </div>

        <Modal.Actions handleAction={handleUpdatePost} variant="update" />
      </Modal.Content>
    </Modal>
  )
}

export default UpdateModal
