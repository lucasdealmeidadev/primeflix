import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import api from '../../services/api';

function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api.get(`movie/${id}`, {
        params: {
          api_key: '29635cea469d75e2285ac15ee8e2356e',
          language: 'pt-BR'
        }
      }).then((response) => {
        setMovie(response.data);
        setLoading(false);
      }).catch(() => {
        console.log('Filme não econtrado.');
      });
    }

    loadMovie();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO');
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.movie_info}>
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className={styles.movie_info}>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} title={movie.title} />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>
    </div>
  );
}

export default Movie;