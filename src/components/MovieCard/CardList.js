import React from 'react'

import Card from './Card'

export default function CardList({ movies }) {
    return (
        <div className="flex flex-wrap">
            {movies.map((movie, index) => {
                return (
                    <Card 
                    key={index}
                    Poster={movie.Poster}
                    Title={movie.Title} 
                    Year={movie.Year}/>
                )
            })}
        </div>
    )
}