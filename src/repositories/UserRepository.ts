import { AxiosResponse } from 'axios'
import { User } from '../models/User'
import api from '../services/api'

export interface ILoginParams {
  email: string
  password: string
}

export interface IRegisterParams {
  name: string
  email: string
  password: string
}

export default class UserRepository {
  async register (params: IRegisterParams): Promise<AxiosResponse<void>> {
    return await api.post('/register', params)
  }

  async login (params: ILoginParams): Promise<AxiosResponse<User>> {
    return await api.post('/login', params)
  }
}
