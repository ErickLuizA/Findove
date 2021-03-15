import { useState } from 'react'
import { FaSpinner, FaExclamationTriangle, FaFilm } from 'react-icons/fa'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'
import Search from '../../components/Search'
import CardList from '../../components/MovieCard/CardList'
import MovieRepository from '../../repositories/MovieRepository'

import { Movie } from '../../models/Movie'
import WatchLaterRepository from '../../repositories/WatchLaterRepository'

interface IMovies {
  loading: boolean
  error: boolean
  movies?: Movie[]
}

export default function Home (movieRepository: MovieRepository, watchLaterRepository: WatchLaterRepository): JSX.Element {
  const [movies, setMovies] = useState<IMovies>({
    loading: false,
    error: false,
    movies: []
  })

  const { width } = useViewport()

  async function handleSearch (searchValue: string): Promise<void> {
    setMovies({
      error: false,
      loading: true
    })

    const result = await movieRepository.searchMovie(searchValue)

    if (result.status === 200) {
      setMovies({
        error: false,
        loading: false,
        movies: result.data
      })
    } else {
      setMovies({
        error: true,
        loading: false
      })
    }
  }

  return (
    <Container>
      <>
        {width < 768 ? <MobileNav /> : <DesktopNav />}
        <main className='w-full'>
          <Search handleSearch={handleSearch} />
          <div className='flex justify-center items-center h-full align-middle'>
            {movies.loading
              ? <FaSpinner className='text-6xl text-secondary' />
              : movies.error
                ? <div> <FaExclamationTriangle className='text-6xl text-secondary mx-auto' /> <h3 className='text-secondary'> Movie not found </h3> </div>
                : movies.movies !== undefined && movies.movies.length > 0
                  ? <CardList movies={movies.movies} watchLaterRepository={watchLaterRepository} />
                  : <div> <FaFilm className='text-6xl text-secondary mx-auto' /> <h3 className='text-secondary'> Search for a movie</h3>  </div>}
          </div>
        </main>
      </>
    </Container>
  )
}
