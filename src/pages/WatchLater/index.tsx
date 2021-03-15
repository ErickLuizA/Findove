
import { useCallback, useEffect, useState } from 'react'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'
import WatchCard from '../../components/MovieCard/WatchCard'

import WatchLaterRepository from '../../repositories/WatchLaterRepository'

import { Movie } from '../../models/Movie'

interface IMovies {
  loading: boolean
  error: boolean
  movies?: Movie[]
}

export default function WatchLater (watchLaterRepository: WatchLaterRepository): JSX.Element {
  const [movies, setMovies] = useState<IMovies>({
    loading: false,
    error: false,
    movies: []
  })
  const { width } = useViewport()

  const getMovies = useCallback(async () => {
    try {
      const response = await watchLaterRepository.getMovie()
      setMovies({
        movies: response.data,
        error: false,
        loading: false
      })
    } catch (error) {
      setMovies({
        movies: [],
        error: true,
        loading: false
      })
    }
  }, [watchLaterRepository])

  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      await getMovies()
    })()
  }, [getMovies])

  return (
    <Container>
      <>
        {width < 768 ? <MobileNav /> : <DesktopNav />}
        <div className='flex flex-col'>
          <h1 className='mx-auto text-2xl text-secondary border-b-4 border-secondary mb-4'>Watch Later List</h1>
          <div className='flex flex-wrap'>
            {movies.movies !== undefined && movies.movies?.length > 0
              ? movies.movies?.map((movie, index) => (
                <WatchCard
                  key={index}
                  watchLaterRepository={watchLaterRepository}
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
