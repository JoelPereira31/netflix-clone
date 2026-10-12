import React, { useState, useEffect } from 'react'
import axios from '../services/axios'
import { API_KEY } from '../services/requests'
import './Modal.css'

function Modal({ movie, onClose }) {
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchTrailer() {
      if (!movie) return

      try {
        // Detecta se é série (tv) ou filme (movie)
        const type = movie.media_type === 'tv' || movie.first_air_date ? 'tv' : 'movie'
        
        // Chamada sem filtro de idioma para pegar TODOS os trailers cadastrados no TMDB
        const response = await axios.get(
          `/${type}/${movie.id}/videos?api_key=${API_KEY}`
        )

        const videos = response.data.results || []

        // Procura primeiro por 'Trailer', se não achar tenta 'Teaser' ou o primeiro vídeo do YouTube
        const trailer =
          videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
          videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ||
          videos.find((v) => v.site === 'YouTube')

        if (trailer) {
          setTrailerUrl(trailer.key)
        } else {
          setTrailerUrl('')
        }
      } catch (error) {
        console.error('Erro ao buscar trailer:', error)
        setTrailerUrl('')
      }
    }

    fetchTrailer()
  }, [movie])

  if (!movie) return null

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="modal__videoContainer">
          {trailerUrl ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="modal__noTrailer"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}")`,
              }}
            >
              <p style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '4px' }}>
                Trailer não encontrado para este título
              </p>
            </div>
          )}
        </div>

        <div className="modal__details">
          <h2 className="modal__title">
            {movie.title || movie.name || movie.original_name}
          </h2>

          <div className="modal__info">
            <span className="modal__rating">
              ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} Avaliação
            </span>
            <span className="modal__date">
              {movie.release_date || movie.first_air_date || ''}
            </span>
          </div>

          <p className="modal__overview">
            {movie.overview || 'Sinopse não disponível em português.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Modal