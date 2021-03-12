import { useEffect, useState } from 'react'

import api from '../../services/api'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'
import WatchCard from '../../components/MovieCard/WatchCard'

export default function WatchLater () {
  const [movies, setMovies] = useState(false)

  const { width } = useViewport()

  useEffect(() => {
    (async () => {
      const res = await api.get('/watchlater')
      const response = res.data

      if (response.length !== 0) {
        setMovies(response)
      }
    })()
  }, [])

  return (
    <Container>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
      <div className='flex flex-col'>
        <h1 className='mx-auto text-2xl text-secondary border-b-4 border-secondary mb-4'>Watch Later List</h1>
        <div className='flex flex-wrap'>
          {movies
            ? movies.map((movie, index) => (
              <WatchCard
                key={index}
                title={movie.title}
                year={movie.year}
                poster={movie.poster}
              />
              ))
            : <h1>Nothing to display</h1>}
        </div>
      </div>
    </Container>
  )
}
