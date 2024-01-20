import api from '@/api/base'
import { toast } from 'react-hot-toast'
import { Comments } from '@/utils/interfaces/Comments'
import { UsersInterface } from '@/utils/interfaces/Users'

export const getUsers = async (): Promise<UsersInterface[]> => {
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
