/* eslint-disable */

import { useContext } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

export default function DesktopNav (): JSX.Element {
  const { signed, user, signOut } = useContext(AuthContext)

  return (
    <div className='text-gray-500 flex flex-col p-5'>
      <div className='my-10 xl:my-20 border-r border-gray-700 pr-4 text-center'>
        <FaUserAlt size='2.5rem' className='m-auto' />
        {signed
          ? <p className='pt-2 whitespace-no-wrap'> Hi, {user} </p>
          : <p className='pt-2 whitespace-no-wrap'> Hi, human </p>}
      </div>
      <nav className='flex flex-col'>
        <Link to='/' className='pb-2 hover:text-white'>
          Discover
        </Link>
        {signed
          ? <>
            <Link
              to='/watchlater'
              className='pb-8 hover:text-white'
            >
              Watch Later
            </Link>
            <button
              className='text-center hover:text-white bg-secondary py-1 '
              onClick={signOut}
            >Logout
            </button>
          </>
          : <>
            <Link
              to='/watchlater'
              className='pb-8 hover:text-white'
            >
              Watch Later
            </Link>
            <Link
              to='/login'
              className='py-1 mb-2 bg-secondary text-center hover:text-white'
            >
              Login
            </Link>
            <Link
              to='/register'
              className='py-1 mb-2 bg-secondary text-center hover:text-white'
            >Register
            </Link>
          </>}
      </nav>
    </div>
  )
}
