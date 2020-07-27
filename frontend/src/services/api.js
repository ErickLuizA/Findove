import axios from 'axios'

const api = axios.create({
  baseURL: 'https://findove.herokuapp.com/'
})

export default api