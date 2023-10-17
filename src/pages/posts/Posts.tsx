import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Logout } from '../../assets/svgs'
import { Button, CreatePost, ListPosts, LogoutModal } from '../../components'
import { useAppSelector } from '../../redux/hooks'
import './styles.css'

function Posts() {
  const user = useAppSelector((state) => state.user)

  const [logoutModal, setLogoutModal] = useState(false)

  if (!user.username) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <section className="posts_container">
        <header>
          <h1 className="text-xl">CodeLeap Network</h1>

          <Button variant="invisible" onClick={() => setLogoutModal(true)}>
            {Logout}
          </Button>
        </header>

        <div>
          <CreatePost />
          <ListPosts />
        </div>
      </section>

      {logoutModal ? (
        <LogoutModal
          open={logoutModal}
          onOpenChange={() => setLogoutModal(false)}
        />
      ) : null}
    </>
  )
}

export default Posts
