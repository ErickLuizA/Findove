import React, { useState } from 'react'
import axios from 'axios'
import { FaSpinner, FaExclamationTriangle, FaFilm } from 'react-icons/fa'

import useViewport from '../../hooks/useViewport'

import Container from '../../components/Container'
import DesktopNav from '../../components/Nav/DesktopNav'
import MobileNav from '../../components/Nav/MobileNav'
import Search from '../../components/Search'
import CardList from '../../components/MovieCard/CardList'

export default function Home() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [waiting, setWaiting] = useState(true)

  const { width } = useViewport()

  const handleSearch = searchValue => {
    setWaiting(false)
    setError(false)
    setLoading(true)
    axios.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=d3a02b0c`)
    .then(res => {
      if(res.data.Response === "True") {
        setMovies(res.data.Search)
        setLoading(false)
      } else {
        setError('Error')
        setLoading(false)
      }
    })
  }

  return (
    <Container>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
      <main className="w-full">
        <Search handleSearch={handleSearch} />
        <div className="flex justify-center items-center h-full align-middle">
          {waiting ? <div> <FaFilm className="text-6xl text-secondary mx-auto"/> <h3 className="text-secondary"> Search for a movie</h3>  </div> : 
          loading && !error ? <FaSpinner className="text-6xl text-secondary"/>:
          error ? <div> <FaExclamationTriangle className="text-6xl text-secondary mx-auto"/> <h3 className="text-secondary"> Movie not found </h3> </div> :
          <CardList movies={movies} />
          }
        </div>
      </main>
    </Container>
  )
}