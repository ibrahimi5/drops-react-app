import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/posts`
})

export const postCreate = (formData) => {
  return api.post('/', formData, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}

export const postIndex = () => {
  return api.get('')
}

export const postShow = (postId) => {
  return api.get(`/${postId}`)
}

export const postUpdate = (postId, formData) => {
  return api.put(`/${postId}`, formData, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}

export const postDelete = (postId) => {
  return api.delete(`/${postId}`, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}

export const commentCreate = (postId, formData) => {
  return api.post(`/${postId}/comments`, formData, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}