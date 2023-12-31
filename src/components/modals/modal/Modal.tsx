import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './styles.css'
import { ComponentProps } from 'react'
import Button from '../../button'

function Modal(props: ComponentProps<typeof AlertDialog.Root>) {
  return <AlertDialog.Root {...props} />
}

function Overlay(props: ComponentProps<typeof AlertDialog.Overlay>) {
  return <AlertDialog.Overlay className="alert_overlay" {...props} />
}

function Trigger(props: ComponentProps<typeof AlertDialog.Trigger>) {
  return <AlertDialog.Trigger asChild {...props} />
}

function Description(props: ComponentProps<typeof AlertDialog.Description>) {
  return <AlertDialog.Description className="text-md" {...props} />
}

function Content(props: ComponentProps<typeof AlertDialog.Content>) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Content className="alert_content" {...props} />
    </AlertDialog.Portal>
  )
}

const buttonVariants = {
  update: {
    variant: 'green',
    label: 'Save',
  },
  delete: {
    variant: 'red',
    label: 'Delete',
  },
  logout: {
    variant: 'primary',
    label: 'Confirm',
  },
} as const

function Actions({
  variant = 'update',
  handleAction,
}: {
  variant?: 'update' | 'delete' | 'logout'
  handleAction: VoidFunction
}) {
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
      <AlertDialog.Cancel asChild>
        <Button variant="secondary">Cancel</Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action asChild>
        <Button
          variant={buttonVariants[variant].variant}
          onClick={handleAction}
        >
          {buttonVariants[variant].label}
        </Button>
      </AlertDialog.Action>
    </div>
  )
}

function Title({
  className,
  ...rest
}: ComponentProps<typeof AlertDialog.Title>) {
  return <AlertDialog.Title className={`alert_title ${className}`} {...rest} />
}

Modal.Trigger = Trigger
Modal.Overlay = Overlay
Modal.Title = Title
Modal.Content = Content
Modal.Description = Description
Modal.Actions = Actions

export default Modal
