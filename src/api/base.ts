import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer 1c3cc84b3263b14b4c3b79269b56e669e33b212653c901a4e09dd68bf176987c`
  }
})

export default api
