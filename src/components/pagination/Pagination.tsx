import { Next, Previous } from '../../assets/svgs'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { nextPage, previousPage } from '../../redux/posts/postsSlice'
import Button from '../button'
import './styles.css'

function Pagination() {
  const posts = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  return (
    <>
      {!!posts.previous || !!posts.next ? (
        <div className="pagination_container">
          <Button
            onClick={() => dispatch(previousPage())}
            variant="invisible"
            disabled={!posts.previous}
          >
            {Previous}
          </Button>

          <Button
            onClick={() => dispatch(nextPage())}
            variant="invisible"
            disabled={!posts.next}
          >
            {Next}
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default Pagination
