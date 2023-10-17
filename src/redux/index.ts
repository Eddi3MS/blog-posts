import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import userSlice from './user/userSlice'
import postsSlice from './posts/postsSlice'
import errorSlice from './error/errorSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    error: errorSlice,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
