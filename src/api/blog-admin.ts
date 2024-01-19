import api from '@/api/base'
import { toast } from 'react-hot-toast'
import { Users } from '@/utils/interfaces/Users'

export const getUserBlogAdmin = async (id: number): Promise<Users[]> => {
  try {
    const response = await api.get(`users/${id}`)
    const data = response.data
    return data
  } catch (error) {
    toast.error('An error occurred while loading data')
    throw error
  }
}
