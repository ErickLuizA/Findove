import { useState, useEffect } from 'react'
import api from '../services/api'

const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@findove-app/user')
    const storagedToken = localStorage.getItem('@findove-app/token')

    if(storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser))

      api.defaults.headers.common = {'Authorization': storagedToken}
    }
  }, [])

  async function signIn(response) {
    setUser(response.user)
    localStorage.setItem('@findove-app/user', JSON.stringify(response.user))
    localStorage.setItem('@findove-app/token', response.token)
  }

  const signOut = () => {
    setUser(null)

    api.defaults.headers.common = { 'Authorization': undefined }

    localStorage.removeItem('@findove-app/user')
    localStorage.removeItem('@findove-app/token')
  }

  return {user, signIn, signOut}
}

export default useAuth