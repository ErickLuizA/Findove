import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts/auth'
import api from '../../services/api'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'

const Login = ({ location }) => {

  const { signIn } = useContext(AuthContext)

  const { width } = useViewport()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleLogin = async e => {
    e.preventDefault()

    const data = {
      email, 
      password
    }

    const res = await api.post('/login', data)

    signIn(res.data)
  }
  
  return (
    <Container>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
      <div className="flex flex-col items-center w-full text-secondary">
        {location.state ? <h1 className="text-xl pt-8 px-2 sm:text-2xl"> {location.state.message} </h1> : null} 
        <form onSubmit={handleLogin} className="flex flex-col mt-auto">
          <label htmlFor="email" className="my-1">Email</label>
          <input type="email" name="email" id="email" className="border-secondary border-2 p-1 my-1" value={email} onChange={handleEmail} />
          <label htmlFor="password" className="my-1">Password</label>
          <input type="password" name="password" id="password" className="border-secondary border-2 p-1 my-1" value={password} onChange={handlePassword} />
          <button type="submit" className="border-secondary focus:outline-none border-2 p-1 mt-1 hover:bg-secondary hover:text-primary" >Login</button>
        </form>
      </div>
    </Container>
  )
}

export default Login