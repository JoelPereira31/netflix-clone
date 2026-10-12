import axios from 'axios'

// Instância base do Axios apontando para a URL da TMDB
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default instance