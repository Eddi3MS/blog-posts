import { useState, useCallback } from 'react'

function usePostData(content = '', title = '') {
  const [postData, setPostData] = useState({
    title,
    content,
  })

  const handleChangePostData = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setPostData((currentData) => ({
        ...currentData,
        [e.target.name]: e.target.value,
      }))
    },
    []
  )

  const handleClearPostData = useCallback(
    () =>
      setPostData({
        title: '',
        content: '',
      }),
    []
  )

  return {
    postData,
    handleChangePostData,
    handleClearPostData,
  }
}

export default usePostData
