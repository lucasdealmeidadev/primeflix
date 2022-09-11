import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTv } from '@fortawesome/free-solid-svg-icons';
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
      <div className={styles.movie_loading}>
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className={styles.movie_info}>
      <h1>{movie.title}</h1>

      <div className={styles.img_zoom}>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} title={movie.title} />
      </div>

      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average.toFixed(1)}/10</strong>

      <div class={styles.area_buttons}>
        <button>
          <FontAwesomeIcon icon={faPlus} size='xs' /> Salvar
        </button>
        <button>
          <a href='#'>
            <FontAwesomeIcon icon={faTv} size='xs' /> Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Movie;