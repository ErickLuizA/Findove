import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

import AuthContext from '../../contexts/auth'

export default function DesktopNav () {
  const [toggle, setToggle] = useState(false)
  const { signed } = useContext(AuthContext)

  return (
    <div className='text-gray-500'>
      <div className='flex justify-between py-3 px-5'>
        <h3 className='font-serif font-bold text-2xl hover:text-white'>Findove</h3>
        {!toggle
          ? <FaBars
              className='h-6 w-6 hover:text-white cursor-pointer my-auto'
              onClick={() => setToggle(state => !state)}
            />
          : <FaTimes
              className='h-6 w-6 hover:text-white cursor-pointer my-auto'
              onClick={() => setToggle(state => !state)}
            />}
      </div>
      <nav className={toggle ? 'flex flex-col items-center' : 'hidden'}>
        <Link to='/' className='hover:text-white pb-1'>
          Discover
        </Link>
        {
          signed
            ? <>
              <Link to='/watchlater' className='pb-4 hover:text-white'>
                Watch Later
              </Link>
              <button className='hover:text-white'>Logout</button>
              </>
            : <>
              <Link to='/watchlater' className='hover:text-white pb-4'>
                Watch Later
              </Link>
              <Link to='/login' className='hover:text-white pb-1'>
                Login
              </Link>
              <Link to='/register' className='hover:text-white pb-1'>
                Register
              </Link>
            </>
        }
      </nav>
    </div>
  )
}
