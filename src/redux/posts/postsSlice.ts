import { createSlice } from '@reduxjs/toolkit'
import { listPosts } from './thunks/listPosts'
import { IError } from '../../errors'
import { getTimeAgo } from '../../utils/formatRelativeTime'

interface SinglePost {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface PostsState {
  loading: boolean
  error: IError | null
  data: SinglePost[] | null
  next: string | null
  previous: string | null
  currentPage: number
}

const initialState: PostsState = {
  loading: true,
  error: null,
  data: null,
  next: null,
  previous: null,
  currentPage: 1,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, { payload }: { payload: SinglePost }) => {
      state.data = [
        {
          ...payload,
          created_datetime: getTimeAgo(new Date(payload.created_datetime)),
        },
        ...(state?.data ? state.data : []),
      ]
    },
    deletePost: (state, { payload }: { payload: { postId: number } }) => {
      if (!state.data) return
      state.data = state.data.filter((post) => post.id !== payload.postId)
    },

    updatePost: (
      state,
      { payload }: { payload: { id: number; title: string; content: string } }
    ) => {
      if (!state?.data) return

      state.data = state.data.map((post) =>
        post.id === payload.id ? { ...post, ...payload } : post
      )
    },
    nextPage: (state) => {
      state.currentPage++
    },
    previousPage: (state) => {
      state.currentPage--
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(listPosts.pending, (state) => {
      state.loading = true
      state.data = null
      state.error = null
    })
    addCase(listPosts.fulfilled, (state, { payload }) => {
      state.data = payload.data
      state.next = payload.next
      state.previous = payload.previous
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

export const { createPost, deletePost, updatePost, nextPage, previousPage } =
  postsSlice.actions

export default postsSlice.reducer
