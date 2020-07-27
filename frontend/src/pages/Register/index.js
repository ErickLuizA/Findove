import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'

const Register = ({ location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { width } = useViewport()

  const handleName = e => {
    setName(e.target.value)
  }

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const history = useHistory()

  const handleRegister = async e => {
    e.preventDefault()

    const data = {
      name,
      email,
      password
    }

    await api.post('/register', data)


    history.push('/login')
  }
  
  return (
    <Container>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
      <form onSubmit={handleRegister} className="flex flex-col mt-auto mx-auto text-secondary ">
          <label htmlFor="name" className="my-1">Name</label>
          <input type="name" name="name" id="name" className="border-secondary border-2 p-1 my-1" value={name} onChange={handleName} />
          <label htmlFor="email" className="my-1">Email</label>
          <input type="email" name="email" id="email" className="border-secondary border-2 p-1 my-1" value={email} onChange={handleEmail} />
          <label htmlFor="password" className="my-1">Password</label>
          <input type="password" name="password" id="password" className="border-secondary border-2 p-1 my-1" value={password} onChange={handlePassword} />
          <button type="submit" className="border-secondary focus:outline-none border-2 p-1 mt-1 hover:bg-secondary hover:text-primary" >Register</button>
      </form>
    </Container>
  )
}

export default Register