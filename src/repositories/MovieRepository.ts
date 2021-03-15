import { AxiosResponse } from 'axios'
import { Movie } from '../models/Movie'

import api from '../services/api'

export default class MovieRepository {
  async searchMovie (search: string): Promise<AxiosResponse<Movie[]>> {
    return await api.get<Movie[]>('/movies', {
      params: {
        search: search
      }
    })
  }
}
