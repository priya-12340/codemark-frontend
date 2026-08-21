import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const client = axios.create({ baseURL: BASE_URL })

client.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function signup(name, email, password) {
  const res = await client.post('/api/auth/signup', { name, email, password })
  return res.data
}

export async function login(email, password) {
  const res = await client.post('/api/auth/login', { email, password })
  return res.data
}

export async function submitReview(code, language) {
  const res = await client.post('/api/reviews', { code, language })
  return res.data
}

export async function getReviews() {
  const res = await client.get('/api/reviews')
  return res.data
}

export async function getReviewById(id) {
  const res = await client.get(`/api/reviews/${id}`)
  return res.data
}

export default client
