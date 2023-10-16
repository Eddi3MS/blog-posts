import { createAsyncThunk } from '@reduxjs/toolkit'
import { PostsServices } from '../../../actions/postsServices/postServices'
import { getTimeAgo } from '../../../utils/formatRelativeTime'
import { ErrorHandling } from '../../../errors'
import { AxiosError } from 'axios'

export const listPosts = createAsyncThunk(
  'posts/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await PostsServices.list()

      if (!response.data || response.status === 204) {
        throw new Error('Nenhum post encontrado.')
      }

      const formattedData = [
        {
          username: 'marcos',
          timestamp: '2023-10-14T20:09:18.093475Z',
          title: 'Testando Hello World',
          content:
            'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.',
        },
        {
          username: 'vini',
          timestamp: '2023-10-16T20:09:18.093475Z',
          title: 'Testando Hello World 2',
          content:
            'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.',
        },
      ].map((entry) => ({
        ...entry,
        timestamp: getTimeAgo(new Date(entry.timestamp)),
      }))

      return formattedData
    } catch (error) {
      const errorHandling = new ErrorHandling(error as AxiosError)

      return rejectWithValue(errorHandling.error)
    }
  }
)
