import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json'
  }
})

export default api
