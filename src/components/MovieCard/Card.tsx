import { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

import { Movie } from '../../models/Movie'

interface ICard {
  handleAddList: (movie: Movie) => void
  movie: Movie
}

export default function Card ({ movie, handleAddList }: ICard): JSX.Element {
  const { signed } = useContext(AuthContext)

  return (
    <div className='mx-auto my-3 text-secondary'>
      <div className='m-1'>
        <div className='flex flex-col items-center'>
          <h1> {movie.Title} </h1>
          <h3> {movie.Year} </h3>
        </div>
        <img className='mx-auto' src={movie.Poster} alt={movie.Title} />
        {signed ? <button onClick={() => handleAddList(movie)} className='w-full focus:outline-none border-secondary border-2 p-1 mt-1 hover:bg-secondary hover:text-primary'>Watch Later</button> : null}
      </div>
    </div>
  )
}
