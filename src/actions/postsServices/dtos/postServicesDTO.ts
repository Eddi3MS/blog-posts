export interface SinglePostDTO {
  author_ip: string
  content: string
  created_datetime: string
  id: number
  title: string
  username: string
}

export interface ListPostsDTO {
  next: string | null
  previous: string | null
  results: SinglePostDTO[]
}
