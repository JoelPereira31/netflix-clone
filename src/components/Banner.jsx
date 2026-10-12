import React, { useState, useEffect } from 'react'
import axios from '../services/axios'
import requests from '../services/requests'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals)
        // Seleciona um filme aleatório da lista de originais da Netflix
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        setMovie(randomMovie)
      } catch (error) {
        console.error('Erro no Banner:', error)
      }
    }
    fetchData()
  }, [])

  // Função clássica para limitar o tamanho da sinopse e colocar reticências (...)
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Assistir</button>
          <button className="banner__button">Minha Lista</button>
        </div>

        <p className="banner__description">
          {truncate(movie?.overview, 160)}
        </p>
      </div>

      {/* Degradê na parte inferior */}
      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner