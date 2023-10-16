import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts'
import Login from '../pages/login/Login'
import Posts from '../pages/posts/Posts'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: '/posts', element: <Posts /> },
    ],
  },
])

export default routes
