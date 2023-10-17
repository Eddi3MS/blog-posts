import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import ErrorModal from '../components/error-modal/ErrorModal'

function RootLayout() {
  const error = useAppSelector((state) => state.error.error)
  return (
    <>
      <main>
        <Outlet />
      </main>

      {error ? <ErrorModal /> : null}
    </>
  )
}

export default RootLayout
