import React, { useState, useEffect, useRef } from 'react'
import axios from '../services/axios'
import './Row.css'

const base_url = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl, isLargeRow = false, onMovieSelect }) {
  const [movies, setMovies] = useState([])
  const rowRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl)
        setMovies(request.data.results)
        return request
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    }
    fetchData()
  }, [fetchUrl])

  // Função para rolar para a esquerda ou direita suavemente
  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      // Rola 70% da largura visível da tela a cada clique
      const scrollAmount = clientWidth * 0.7
      const targetScroll =
        direction === 'left'
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount

      rowRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__container">
        {/* Flecha Esquerda */}
        <button
          className="row__arrow row__arrow--left"
          onClick={() => handleScroll('left')}
          aria-label="Rolar para esquerda"
        >
          ‹
        </button>

        {/* Fileira de Cartazes */}
        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => {
            const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path

            if (!imagePath) return null

            return (
              <img
                key={movie.id}
                onClick={() => onMovieSelect && onMovieSelect(movie)}
                className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
                src={`${base_url}${imagePath}`}
                alt={movie.name || movie.title}
              />
            )
          })}
        </div>

        {/* Flecha Direita */}
        <button
          className="row__arrow row__arrow--right"
          onClick={() => handleScroll('right')}
          aria-label="Rolar para direita"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Row