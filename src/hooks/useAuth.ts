import { useState, useEffect } from 'react'

import { IAuthContext } from '../contexts/auth'
import { User } from '../models/User'

import api from '../services/api'

export default function useAuth (): IAuthContext {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@findove-app/user')
    const storagedToken = localStorage.getItem('@findove-app/token')

    if (storagedUser !== null && storagedToken !== null) {
      setUser(storagedUser)

      api.defaults.headers.Authorization = `Bearer ${storagedToken}`
    }
  }, [])

  async function signIn (response: User): Promise<void> {
    setUser(response.user)

    localStorage.setItem('@findove-app/user', response.user)
    localStorage.setItem('@findove-app/token', response.token)
  }

  const signOut = (): void => {
    setUser(null)

    api.defaults.headers.Authorization = `Bearer ${undefined}` // eslint-disable-line

    localStorage.removeItem('@findove-app/user')
    localStorage.removeItem('@findove-app/token')
  }

  return { signed: Boolean(user), user, signIn, signOut }
}
