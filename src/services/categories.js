import axios from 'axios'

const api = axios.create ({
    baseURL: `${import.meta.env.VITE_API_URL}/categories`
})

export const categoryIndex = () => {
  return api.get('')
}

export const postByCategories = (categoryId) => {
  return api.get(`/${categoryId}/posts`)
}