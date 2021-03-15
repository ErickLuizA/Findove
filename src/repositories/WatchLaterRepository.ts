import { AxiosResponse } from 'axios'
import { Movie } from '../models/Movie'

import api from '../services/api'

export default class WatchLaterRepository {
  async getMovie (): Promise<AxiosResponse<Movie[]>> {
    return await api.get('/watchlater')
  }

  async addMovie (params: Movie): Promise<AxiosResponse<void>> {
    return await api.post('/watchlater', params)
  }

  async deleteMovie (params: Movie): Promise<AxiosResponse<void>> {
    return await api.delete(`/watchlater/${params.id ?? ''}`)
  }
}
