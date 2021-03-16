import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

import { Movie } from '../../models/Movie'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'
import WatchCard from '../../components/MovieCard/WatchCard'

import WatchLaterRepository from '../../repositories/WatchLaterRepository'

interface IMovies {
  loading: boolean
  movies?: Movie[]
}

export default function WatchLater (watchLaterRepository: WatchLaterRepository): JSX.Element {
  const [movies, setMovies] = useState<IMovies>({
    loading: false,
    movies: []
  })

  const [deleteFailure, setDeleteFailure] = useState(false)

  const { width } = useViewport()

  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      try {
        const result = await watchLaterRepository.getMovie()

        setMovies({
          movies: result.data,
          loading: false
        })
      } catch (error) {
        setMovies({
          movies: [],
          loading: false
        })
      }
    })()
  }, [])

  const handleDelete = async (movie: Movie): Promise<void> => {
    try {
      await watchLaterRepository.deleteMovie(movie)
    } catch (error) {
      setDeleteFailure(true)
    }
  }

  return (
    <Container>
      <>
        {width < 768 ? <MobileNav /> : <DesktopNav />}
        <div className='flex flex-col'>
          <h1 className='mx-auto text-2xl text-secondary border-b-4 border-secondary mb-4'>Watch Later List</h1>
          <div className='flex flex-wrap'>
            {movies.loading
              ? <FaSpinner className='text-6xl text-center text-secondary animate-spin' />
              : movies.movies !== undefined && movies.movies?.length > 0
                ? movies.movies?.map((movie, index) => (
                  <WatchCard
                    key={index}
                    handleDelete={async () => await handleDelete(movie)}
                    movie={movie}
                  />
                ))
                : <h1>Nothing to display</h1>}
          </div>
        </div>
      </>
    </Container>
  )
}
