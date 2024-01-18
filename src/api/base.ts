import { UninterceptedApiError } from '@/utils/types/api'
import axios, { AxiosError } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')

  if (config.headers) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  (error: AxiosError<UninterceptedApiError>) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/login'
      return Promise.reject(error)
    }
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0]
          }
        }
      })
    }

    return Promise.reject(error)
  }
)
export default api
