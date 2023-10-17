import { AxiosError } from 'axios'
import { PostsServices } from '../../../actions/postsServices/postServices'
import { ErrorHandling } from '../../../errors'
import { setError } from '../../../redux/error/errorSlice'
import { useAppDispatch } from '../../../redux/hooks'
import { deletePost } from '../../../redux/posts/postsSlice'
import Modal from '../modal/Modal'

interface DeleteModalProps {
  open: boolean
  onOpenChange: VoidFunction
  postId: number
}

function DeleteModal({ postId, onOpenChange, ...rest }: DeleteModalProps) {
  const dispatch = useAppDispatch()
  const handleDelete = async () => {
    try {
      await PostsServices.delete(postId)

      dispatch(deletePost({ postId }))
    } catch (error) {
      const errorHandling = new ErrorHandling(error as AxiosError)
      dispatch(setError({ error: errorHandling.error.message }))
    }
  }
  return (
    <Modal {...rest} onOpenChange={onOpenChange}>
      <Modal.Overlay onClick={onOpenChange} />
      <Modal.Content>
        <Modal.Title className="text-xl">
          Are you sure you want to delete this item?
        </Modal.Title>
        <Modal.Actions handleAction={handleDelete} variant="delete" />
      </Modal.Content>
    </Modal>
  )
}

export default DeleteModal
