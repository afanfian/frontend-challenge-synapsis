import api from '@/api/base'
import { toast } from 'react-hot-toast'
import { BlogPostList } from '@/utils/interfaces/BlogPostList'

export const getBlogPostList = async (): Promise<BlogPostList[]> => {
  try {
    const response = await api.get('posts')
    const data = response.data
    return data
  } catch (error) {
    toast.error('An error occurred while loading data')
    throw error
  }
}
