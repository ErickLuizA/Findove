import { ChangeEvent, FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import useViewport from '../../hooks/useViewport'

import UserRepository, { IRegisterParams } from '../../repositories/UserRepository'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'

export default function Register (userRepository: UserRepository): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const { width } = useViewport()

  const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const history = useHistory()

  const handleRegister = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    const data: IRegisterParams = {
      name,
      email,
      password
    }

    try {
      await userRepository.register(data)

      history.push('/login')
    } catch (error) {
      const msg = error.message as string

      if (msg.includes('400')) {
        setError('User already exists')
      } else {
        setError('Network Error')
      }
    }
  }

  return (
    <Container>
      <>
        {width < 768 ? <MobileNav /> : <DesktopNav />}
        <form
          onSubmit={handleRegister}
          className='flex flex-col mt-auto mx-auto text-secondary '
        >
          <label
            htmlFor='name'
            className='my-1'
          >Name
          </label>
          <input
            type='name'
            name='name'
            id='name'
            className='border-secondary border-2 p-1 my-1'
            value={name}
            onChange={handleName}
          />
          <label
            htmlFor='email'
            className='my-1'
          >Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='border-secondary border-2 p-1 my-1'
            value={email}
            onChange={handleEmail}
          />
          <label
            htmlFor='password'
            className='my-1'
          >Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='border-secondary border-2 p-1 my-1'
            value={password}
            onChange={handlePassword}
          />

          {error !== '' ? <p className='text-red-500 text-sm'> {error} </p> : null}

          <button
            type='submit'
            className='border-secondary focus:outline-none border-2 p-1 mt-1 hover:bg-secondary hover:text-primary'
          >Register
          </button>
        </form>
      </>
    </Container>
  )
}
