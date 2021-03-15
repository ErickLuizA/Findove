
import { Movie } from '../../models/Movie'
import WatchLaterRepository from '../../repositories/WatchLaterRepository'
import Card from './Card'

interface ICardList {
  movies: Movie[]
  watchLaterRepository: WatchLaterRepository

}

export default function CardList ({ movies, watchLaterRepository }: ICardList): JSX.Element {
  return (
    <div className='flex flex-wrap'>
      {movies.map((movie, index) => {
        return (
          <Card
            key={index}
            movie={movie}
            watchLaterRepository={watchLaterRepository}
          />
        )
      })}
    </div>
  )
}
