import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { PostsServices } from '../../../actions/postsServices/postServices'
import { ErrorHandling } from '../../../errors'
import { getTimeAgo } from '../../../utils/formatRelativeTime'

export const listPosts = createAsyncThunk(
  'posts/list',
  async (currentPage: number, { rejectWithValue }) => {
    try {
      const response = await PostsServices.list(currentPage)

      if (
        !response?.data?.results ||
        !response?.data?.results.length ||
        response.status === 204
      ) {
        throw new Error('No posts found.')
      }

      const formattedData = response.data.results.map((entry) => ({
        ...entry,
        created_datetime: getTimeAgo(new Date(entry.created_datetime)),
      }))

      return {
        data: formattedData,
        next: response.data.next,
        previous: response.data.previous,
      }
    } catch (error) {
      const errorHandling = new ErrorHandling(error as AxiosError)

      return rejectWithValue(errorHandling.error)
    }
  }
)
