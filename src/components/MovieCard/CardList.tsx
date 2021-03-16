
import { Movie } from '../../models/Movie'
import Card from './Card'

interface ICardList {
  movies: Movie[]
  handleAddList: () => void
}

export default function CardList ({ movies, handleAddList }: ICardList): JSX.Element {
  return (
    <div className='flex flex-wrap'>
      {movies.map((movie, index) => {
        return (
          <Card
            key={index}
            movie={movie}
            handleAddList={handleAddList}
          />
        )
      })}
    </div>
  )
}
