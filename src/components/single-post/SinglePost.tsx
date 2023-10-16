import './styles.css'

interface SinglePostProps {
  showActions: boolean
  title: string
  username: string
  timestamp: string
  content: string
}

function SinglePost({
  showActions,
  title,
  username,
  timestamp,
  content,
}: SinglePostProps) {
  return (
    <article className="single_post_container">
      <header>
        <h3 className="text-xl">{title}</h3>
        {showActions ? (
          <div>
            <button>deletar</button> <button>editar</button>
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
