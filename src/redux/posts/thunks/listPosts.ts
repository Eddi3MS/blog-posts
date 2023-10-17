import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { PostsServices } from '../../../actions/postsServices/postServices'
import { ErrorHandling } from '../../../errors'
import { getTimeAgo } from '../../../utils/formatRelativeTime'

export const listPosts = createAsyncThunk(
  'posts/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await PostsServices.list()

      if (
        !response?.data?.results ||
        !response?.data?.results.length ||
        response.status === 204
      ) {
        throw new Error('Nenhum post encontrado.')
      }

      const formattedData = response.data.results.map((entry) => ({
        ...entry,
        created_datetime: getTimeAgo(new Date(entry.created_datetime)),
      }))

      return formattedData
    } catch (error) {
      const errorHandling = new ErrorHandling(error as AxiosError)

      return rejectWithValue(errorHandling.error)
    }
  }
)
