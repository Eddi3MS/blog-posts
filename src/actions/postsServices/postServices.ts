import { api } from '../api'

interface CreatePostParams {
  username: string
  title: string
  content: string
}

class PostsServices {
  public static async create(data: CreatePostParams) {
    return await api.post('/careers/', data)
  }

  public static async update(
    id: string,
    data: Omit<CreatePostParams, 'username'>
  ) {
    return await api.patch(`/careers/${id}/`, data)
  }

  public static async delete(id: string) {
    return await api.delete(`/careers/${id}/`)
  }

  public static async list() {
    return await api.get('/careers/')
  }
}

export { PostsServices }
