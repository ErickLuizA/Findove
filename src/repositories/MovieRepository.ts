import { AxiosResponse } from 'axios'
import { Movie } from '../models/Movie'

import api from '../services/api'

interface ISearchResponse {
  Search: Movie[]
}

export default class MovieRepository {
  async searchMovie (search: string): Promise<AxiosResponse<ISearchResponse>> {
    return await api.get<ISearchResponse>('/movies', {
      params: {
        search: search
      }
    })
  }
}
