import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <h1>login</h1> },
      { path: '/posts', element: <h1>posts</h1> },
    ],
  },
])

export default routes
