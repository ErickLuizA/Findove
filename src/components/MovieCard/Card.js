import { useContext } from 'react'

import AuthContext from '../../contexts/auth'
import api from '../../services/api'

export default function Card ({ Poster, Title, Year }) {
  const { signed } = useContext(AuthContext)

  const handleAddList = async () => {
    const data = {
      Title,
      Year,
      Poster
    }

    await api.post('/watchlater', data)
  }

  return (
    <div className='mx-auto my-3 text-secondary'>
      <div className='m-1'>
        <div className='flex flex-col items-center'>
          <h1> {Title} </h1>
          <h3> {Year} </h3>
        </div>
        <img className='mx-auto' src={Poster} alt={Title} />
        {signed ? <button onClick={handleAddList} className='w-full focus:outline-none border-secondary border-2 p-1 mt-1 hover:bg-secondary hover:text-primary'>Watch Later</button> : null}
      </div>
    </div>
  )
}
