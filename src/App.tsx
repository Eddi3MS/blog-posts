import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './styles/global.css'
import { Provider } from 'react-redux'
import { store } from './redux'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App

