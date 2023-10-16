import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { store } from '../redux'

function RootLayout() {
  return (
    <Provider store={store}>
      <main>
        <Outlet />
      </main>
    </Provider>
  )
}

export default RootLayout
