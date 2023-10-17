import { ButtonHTMLAttributes, forwardRef } from 'react'
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'red' | 'green' | 'secondary' | 'invisible'
}

function Button(
  { isLoading, children, className, variant = 'primary', ...rest }: ButtonProps,
  ref: React.LegacyRef<HTMLButtonElement>
) {
  return (
    <button
      {...rest}
      className={`button button-${variant} ${className}`}
      ref={ref}
    >
      {isLoading ? 'loading...' : children}
    </button>
  )
}

const ButtonWithRef = forwardRef(Button)

export default ButtonWithRef
