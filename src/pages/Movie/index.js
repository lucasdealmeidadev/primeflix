import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTv } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import styles from './styles.module.css';
import api from '../../services/api';

function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      api.get(`movie/${id}`).then((response) => {
        setMovie(response.data);
        setLoading(false);
      }).catch(() => {
        console.log('Filme não econtrado.');
      });
    }

    loadMovie();
  }, [id]);

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

        <h3>Sinopse</h3>
        <span>{movie.overview}</span>
        <strong>Avaliação: {movie.vote_average.toFixed(1)}/10</strong>

        <div className={styles.area_buttons}>
          <button>
            <FontAwesomeIcon icon={faPlus} size='xs' /> Salvar
          </button>
          <button>
            <a href='/'>
              <FontAwesomeIcon icon={faTv} size='xs' /> Trailer
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Movie);