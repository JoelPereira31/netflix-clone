import React, { useState } from 'react'
import Nav from './components/Nav'
import Banner from './components/Banner'
import Row from './components/Row'
import Modal from './components/Modal'
import requests from './services/requests'
import './App.css'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)

  return (
    <div className="App">
      <Nav />

      <Banner />

      <Row
        title="Originais Netflix"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Mais Votados"
        fetchUrl={requests.fetchTopRated}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Em Alta"
        fetchUrl={requests.fetchTrending}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Filmes de Ação"
        fetchUrl={requests.fetchActionMovies}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Filmes de Comédia"
        fetchUrl={requests.fetchComedyMovies}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Filmes de Terror"
        fetchUrl={requests.fetchHorrorMovies}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Romance"
        fetchUrl={requests.fetchRomanceMovies}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />
      <Row
        title="Documentários"
        fetchUrl={requests.fetchDocumentaries}
        onMovieSelect={(movie) => setSelectedMovie(movie)}
      />

      {/* Modal que abre ao clicar em um filme */}
      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default App