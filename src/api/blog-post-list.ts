import api from '@/api/base'
import { BlogPostList } from '@/utils/interfaces/BlogPostList'
import { toast } from 'react-hot-toast'

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
