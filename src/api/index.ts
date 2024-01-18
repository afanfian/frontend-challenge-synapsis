import { toast } from 'react-hot-toast'
import api from './base'

export const getUser = async (config?: any) => {
  const res = await api.get('/users/profile', config)
  return res.data
}

export const registerAccount = async (data: any) => {
  const res = await api.post('/users', data)
  toast.success('Register Berhasil')
  setTimeout(() => {
    window.location.replace('/login')
  }, 1000)
}
