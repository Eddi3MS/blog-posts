import { AxiosError } from 'axios'
import { AppError, IError } from '..'

class ErrorHandling {
  private _statusCode: number
  private _message: string

  constructor(error: AxiosError, defaultMessage?: string) {
    if (error instanceof AppError) {
      this._statusCode = error?.statusCode ?? 400
      this._message = error?.message ?? (defaultMessage || '')
    } else {
      this._statusCode = error?.response?.status ?? 400
      this._message =
        error?.message || defaultMessage || 'Something went wrong.'
    }
  }

  get error(): IError {
    return {
      statusCode: this._statusCode,
      message: this._message,
    }
  }
}

export { ErrorHandling }
