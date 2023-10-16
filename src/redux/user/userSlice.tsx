import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  username: string | null
}

const initialState: UserState = {
  username: localStorage.getItem('@codeleap-username'),
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state: UserState) => {
      state.username = null
      localStorage.removeItem('@codeleap-username')
    },
    login: (
      state: UserState,
      { payload }: { payload: { username: string } }
    ) => {
      state.username = payload.username
      localStorage.setItem('@codeleap-username', payload.username)
    },
  },
})

export const { logout, login } = userSlice.actions
export default userSlice.reducer
