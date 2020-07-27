import React, { useContext } from 'react'
import AuthContext from '../../contexts/auth'
import api from '../../services/api'

const WatchCard = ({ title, year, poster }) => {

  const { user } = useContext(AuthContext)

    const handleDelete = async () => {
        const data = {
            title,
            year,
            poster,
            userId: user.id
        }

        await api.post('/deleteItem', data)
    }

    return (
      <div className="my-3 mx-auto text-secondary" >
        <div className="m-1 flex flex-col items-center">
          <h1> {title} </h1>
          <h3> {year} </h3>
          <img src={poster} alt={title} />
          <button 
          onClick={handleDelete} 
          className="w-full focus:outline-none border-red-700 text-red-700 border-2 p-1 mt-1 hover:bg-red-400 hover:text-red-900" >
            Delete Item
          </button>
        </div>
      </div>
    )
}

export default WatchCard