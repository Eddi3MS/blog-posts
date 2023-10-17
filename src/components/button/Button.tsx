import { ButtonHTMLAttributes } from 'react'
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'red' | 'green' | 'secondary' | 'invisible'
}

function Button({
  isLoading,
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={`button button-${variant} ${className}`}>
      {isLoading ? 'loading...' : children}
    </button>
  )
}

export default Button
