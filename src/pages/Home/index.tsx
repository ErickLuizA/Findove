import { useState } from 'react'
import { FaSpinner, FaExclamationTriangle, FaFilm } from 'react-icons/fa'

import { Movie } from '../../models/Movie'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'
import Search from '../../components/Search'
import CardList from '../../components/MovieCard/CardList'

import MovieRepository from '../../repositories/MovieRepository'
import WatchLaterRepository from '../../repositories/WatchLaterRepository'

interface IMovies {
  loading: boolean
  error: string
  movies?: Movie[]
}

export default function Home (movieRepository: MovieRepository, watchLaterRepository: WatchLaterRepository): JSX.Element {
  const [movies, setMovies] = useState<IMovies>({
    loading: false,
    error: '',
    movies: []
  })

  const [deleteFailure, setDeleteFailure] = useState(false)

  const { width } = useViewport()

  async function handleSearch (searchValue: string): Promise<void> {
    setMovies({
      error: '',
      loading: true
    })

    try {
      const result = await movieRepository.searchMovie(searchValue)

      setMovies({
        error: result.data.Search === undefined ? 'Movie not found' : '',
        loading: false,
        movies: result.data.Search
      })
    } catch (e) {
      setMovies({
        error: 'Network error',
        loading: false
      })
    }
  }

  const handleAddList = async (movie: Movie): Promise<void> => {
    try {
      await watchLaterRepository.addMovie(movie)
    } catch (error) {
      setDeleteFailure(true)
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
              ? <FaSpinner className='text-6xl text-secondary animate-spin' />
              : movies.error !== ''
                ? <div> <FaExclamationTriangle className='text-6xl text-secondary mx-auto' /> <h3 className='text-secondary'> {movies.error} </h3> </div>
                : movies.movies !== undefined && movies.movies.length > 0
                  ? <CardList movies={movies.movies} handleAddList={() => handleAddList} />
                  : <div> <FaFilm className='text-6xl text-secondary mx-auto' /> <h3 className='text-secondary'> Search for a movie</h3>  </div>}
          </div>
        </main>
      </>
    </Container>
  )
}
