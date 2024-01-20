import api from '@/api/base'
import { toast } from 'react-hot-toast'
import { UsersInterface } from '@/utils/interfaces/Users'

export const getUser = async (id: number): Promise<UsersInterface[]> => {
  try {
    const response = await api.get(`users/${id}`)
    const data = response.data
    return data
  } catch (error) {
    toast.error('An error occurred while loading data')
    throw error
  }
}

export const storeUser = async (data: any) => {
  try {
    const response = await api.post(`users`, data, {
      headers: {
        Authorization: `Bearer 1c3cc84b3263b14b4c3b79269b56e669e33b212653c901a4e09dd68bf176987c`
      }
    })
    toast.success('User added successfully')
    return response.data
  } catch (error) {
    toast.error('An error occurred while adding the user')
    throw error
  }
}

export const deleteUser = async (id: number) => {
  try {
    const res = await api.delete(`users/${id}`)
    toast.success('User deleted successfully')
  } catch (error) {
    toast.error('Terjadi kesalahan saat memuat data.')
    throw error
  }
}

export const updateUser = async (id: number, data: any) => {
  try {
    const response = await api.put(`users/${id}`, data, {
      headers: {
        Authorization: `Bearer 1c3cc84b3263b14b4c3b79269b56e669e33b212653c901a4e09dd68bf176987c`
      }
    })
    return response.data
  } catch (error) {
    toast.error('An error occurred while updating the user')
    throw error
  }
}
