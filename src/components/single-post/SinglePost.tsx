import { DeleteIcon, EditIcon } from '../../assets/svgs'
import Button from '../button'
import './styles.css'

interface SinglePostProps {
  showActions: boolean
  title: string
  username: string
  timestamp: string
  content: string
  handleDeleteModal: VoidFunction
  handleUpdateModal: VoidFunction
}

function SinglePost({
  showActions,

  title,
  username,
  timestamp,
  content,
  handleDeleteModal,
  handleUpdateModal,
}: SinglePostProps) {
  return (
    <article className="single_post_container">
      <header>
        <h3 className="text-xl">{title}</h3>
        {showActions ? (
          <div className="single_post_actions">
            <Button variant="invisible" onClick={handleDeleteModal}>
              {DeleteIcon}
            </Button>
            <Button variant="invisible" onClick={handleUpdateModal}>
              {EditIcon}
            </Button>
          </div>
        ) : null}
      </header>
      <div className="single_post_content">
        <div className="single_post_content__data">
          <span className="text-l bold">@{username}</span>
          <span className="text-l">{timestamp}</span>
        </div>
        <p className="text-l">{content}</p>
      </div>
    </article>
  )
}

export default SinglePost
