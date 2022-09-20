import { memo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTv } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import styles from './styles.module.css';
import api from '../../services/api';

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      api.get(`movie/${id}`).then((response) => {
        setMovie(response.data);
        setLoading(false);
      }).catch(() => {
        navigate('/', { replace: true });
        return;
      });
    }

    loadMovie();
  }, [navigate, id]);

  function saveMovie() {
    const keyName = '@primeflix';
    const myList = localStorage.getItem(keyName);
    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

    if (hasMovie) {
      alert('Filme já está salvo na lista.');
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem(keyName, JSON.stringify(savedMovies));
    alert('Filme salvo com sucesso.');
  }

  if (loading) {
    return (
      <div className={styles.movie_loading}>
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.movie_info}>
        <h1>{movie.title}</h1>
        <div className={styles.img}>
          {
            movie.backdrop_path !== null ? (
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                effect='blur'
                alt={movie.title}
                title={movie.title}
                placeholderSrc='/glyphicons/picture-grey.svg'
              />
            ) : (
              <img
                src='/images/placeholder_image.png'
                alt={movie.title}
                title={movie.title}
              />
            )
          }
        </div>

        <h3>Descrição</h3>
        <span>{movie.overview}</span>
        <strong>Avaliação: {movie.vote_average.toFixed(1)}/10</strong>

        <div className={styles.area_buttons}>
          <button onClick={saveMovie}>
            <FontAwesomeIcon icon={faPlus} size='xs' /> Salvar
          </button>
          <button>
            <a href={`https://youtube.com/results?search_query=${movie.title} Trailer`} target='blank' rel='external'>
              <FontAwesomeIcon icon={faTv} size='xs' /> Trailer
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Movie);