import { useAppDispatch } from '../../../redux/hooks'
import { logout } from '../../../redux/user/userSlice'
import Modal from '../modal/Modal'

interface LogoutModalProps {
  open: boolean
  onOpenChange: VoidFunction
}

function LogoutModal({ onOpenChange, ...rest }: LogoutModalProps) {
  const dispatch = useAppDispatch()

  return (
    <Modal {...rest} onOpenChange={onOpenChange}>
      <Modal.Overlay onClick={onOpenChange} />
      <Modal.Content>
        <Modal.Title className="text-xl">
          Are you sure you want to logout?
        </Modal.Title>
        <Modal.Actions
          handleAction={() => dispatch(logout())}
          variant="logout"
        />
      </Modal.Content>
    </Modal>
  )
}

export default LogoutModal
