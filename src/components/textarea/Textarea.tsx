import React, { TextareaHTMLAttributes, ReactNode, forwardRef } from 'react'
import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  wrapperClass?: string
  labelClass?: string
  children?: ReactNode
  error?: string
}

function Textarea(
  {
    id,
    label,
    wrapperClass = '',
    className = '',
    labelClass = '',
    error,
    ...rest
  }: TextareaProps,
  ref: React.LegacyRef<HTMLTextAreaElement>
) {
  return (
    <div className={`textarea_container  ${wrapperClass}`}>
      <label htmlFor={id} className={`text-nm ${labelClass}`}>
        {label}
      </label>

      <textarea
        id={id}
        ref={ref}
        {...rest}
        className={`text-sm textarea_input ${className}`}
      />

      {error ? <p className="text-sm textarea_error">{error}</p> : null}
    </div>
  )
}

const InputWithRef = forwardRef(Textarea)

export default InputWithRef
