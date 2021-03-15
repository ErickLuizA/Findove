import React, { createContext } from 'react'

import useAuth from '../hooks/useAuth'
import { User } from '../models/User'

export interface IAuthContext {
  signed: boolean
  user: string | null
  signIn: (response: User) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext) // eslint-disable-line

const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const authContext = useAuth()

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
