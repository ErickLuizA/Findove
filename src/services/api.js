import axios from 'axios'

const api = axios.create({
  baseURL: 'https://findove.herokuapp.com'
  // baseURL: 'http://localhost:3333'
})

export default api