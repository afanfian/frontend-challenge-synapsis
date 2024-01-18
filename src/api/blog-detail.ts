import api from '@/api/base'
import { Comments } from '@/utils/interfaces/Comments'
import { Users } from '@/utils/interfaces/Users'
import { toast } from 'react-hot-toast'

export const getUsers = async (): Promise<Users[]> => {
  try {
    const response = await api.get('users')
    const data = response.data
    return data
  } catch (error) {
    toast.error('An error occurred while loading data')
    throw error
  }
}

export const getComments = async (): Promise<Comments[]> => {
  try {
    const response = await api.get('comments')
    const data = response.data
    return data
  } catch (error) {
    toast.error('An error occurred while loading data')
    throw error
  }
}
