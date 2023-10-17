import { createSlice } from '@reduxjs/toolkit'

interface ErrorState {
  error: string | null
}

const initialState: ErrorState = {
  error: null,
}

const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (
      state: ErrorState,
      { payload }: { payload: { error: string } }
    ) => {
      state.error = payload.error
    },
    clearError: (state: ErrorState) => {
      state.error = null
    },
  },
})

export const { clearError, setError } = errorSlice.actions
export default errorSlice.reducer
