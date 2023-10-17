import { clearError } from '../../redux/error/errorSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Button from '../button'
import Modal from '../modal/Modal'

function ErrorModal() {
  const error = useAppSelector((state) => state.error.error)
  const dispatch = useAppDispatch()

  const handleClearError = () => {
    dispatch(clearError())
  }

  return (
    <Modal open={!!error}>
      <Modal.Overlay onClick={handleClearError} />
      <Modal.Content>
        <Modal.Title className="text-xl">Something went wrong!!</Modal.Title>
        <Modal.Description>{error}</Modal.Description>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Button variant="primary" onClick={handleClearError}>
            OK
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default ErrorModal
