
import { Movie } from '../../models/Movie'

interface IWatchCard {
  movie: Movie
  handleDelete: () => void
}

const WatchCard = ({ movie, handleDelete }: IWatchCard): JSX.Element => {
  return (
    <div className='my-3 mx-auto text-secondary'>
      <div className='m-1 flex flex-col items-center'>
        <h1> {movie.Title} </h1>
        <h3> {movie.Year} </h3>
        <img src={movie.Poster} alt={movie.Title} />
        <button
          onClick={handleDelete}
          className='w-full focus:outline-none border-red-700 text-red-700 border-2 p-1 mt-1 hover:bg-red-400 hover:text-red-900'
        >
          Delete Movie
        </button>
      </div>
    </div>
  )
}

export default WatchCard
