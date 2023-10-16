import { createSlice } from '@reduxjs/toolkit'

interface IUserState {
  username: string | null
}

const initialState: IUserState = {
  username: localStorage.getItem('@codeleap-username'),
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state: IUserState) => {
      state.username = null
      localStorage.removeItem('@codeleap-username')
    },
    login: (
      state: IUserState,
      { payload }: { payload: { username: string } }
    ) => {
      state.username = payload.username
      localStorage.setItem('@codeleap-username', payload.username)
    },
  },
})

export const { logout, login } = userSlice.actions
export default userSlice.reducer
