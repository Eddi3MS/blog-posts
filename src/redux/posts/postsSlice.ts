import { createSlice } from '@reduxjs/toolkit'
import { listPosts } from './thunks/listPosts'
import { IError } from '../../errors'

interface PostsState {
  loading: boolean
  error: IError | null
  data:
    | {
        username: string
        timestamp: string
        title: string
        content: string
      }[]
    | null
}

const initialState: PostsState = {
  loading: true,
  error: null,
  data: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost: () => {},
  },
  extraReducers: ({ addCase }) => {
    addCase(listPosts.pending, (state) => {
      state.loading = true
      state.data = null
      state.error = null
    })
    addCase(listPosts.fulfilled, (state, { payload }) => {
      state.data = payload
      state.loading = false
      state.error = null
    })
    addCase(listPosts.rejected, (state, { payload }) => {
      const error: IError = {
        message: (payload as IError)?.message,
        statusCode: (payload as IError)?.statusCode,
      }

      state.error = error
      state.loading = false
    })
  },
})

export const { updatePost } = postsSlice.actions

export default postsSlice.reducer
