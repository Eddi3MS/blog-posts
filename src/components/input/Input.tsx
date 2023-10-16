import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  wrapperClass?: string
  labelClass?: string
  children?: ReactNode
  error?: string
}

function Input(
  {
    id,
    label,
    wrapperClass = '',
    className = '',
    labelClass = '',
    error,
    type,
    ...rest
  }: InputProps,
  ref: React.LegacyRef<HTMLInputElement>
) {
  return (
    <div className={`input_container  ${wrapperClass}`}>
      <label htmlFor={id} className={`text-nm ${labelClass}`}>
        {label}
      </label>

      <input
        type={type}
        id={id}
        ref={ref}
        {...rest}
        className={`text-sm input_input ${className}`}
      />

      {error ? <p className="text-sm input_error">{error}</p> : null}
    </div>
  )
}

const InputWithRef = forwardRef(Input)

export default InputWithRef
