import React, { createContext } from 'react'
import useAuth from '../hooks/useAuth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const { user, signIn, signOut } = useAuth()

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext