import { AxiosResponse } from 'axios'
import { api } from '../api'
import { ListPostsDTO, SinglePostDTO } from './dtos/postServicesDTO'

interface CreatePostParams {
  username: string
  title: string
  content: string
}

class PostsServices {
  public static async create(
    data: CreatePostParams
  ): Promise<AxiosResponse<SinglePostDTO>> {
    return await api.post<SinglePostDTO>('/careers/', data)
  }

  public static async update(
    id: number,
    data: Omit<CreatePostParams, 'username'>
  ) {
    return await api.patch(`/careers/${id}/`, data)
  }

  public static async delete(id: number) {
    return await api.delete(`/careers/${id}/`)
  }

  public static async list(): Promise<AxiosResponse<ListPostsDTO>> {
    return await api.get<ListPostsDTO>('/careers/')
  }
}

export { PostsServices }
