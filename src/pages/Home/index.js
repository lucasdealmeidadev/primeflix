import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBackward } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, Loading } from '../../components';

import imageNotFound from '../../assets/images/placeholder.png';
import placeholderImage from '../../assets/glyphicons/picture-grey.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-circular-progressbar/dist/styles.css';

import styles from './styles.module.css';
import api from '../../services/api';

function Home() {
  const [movies, setMovies] = useState([]);
  const [oldMovies, setOldMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchMovies, setSearchMovies] = useState(false);

  const formatDate = (value) => {
    if (value === null) return 'Não Disponível';

    let options = {
      timeZone: 'America/Sao_Paulo',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    const date = new Date(value);
    return date.toLocaleDateString('pt-br', options);
  }

  const handleBack = () => {
    setMovies(oldMovies);
    setSearch('');
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search === '') return;

    setSearchMovies(true);

    const response = await api.get('search/movie', {
      params: {
        query: search
      }
    });

    const { results } = response.data;

    if (results.length > 0) {
      setMovies(results);
    }

    setMovies(results);
    setSearchMovies(false);
  }


  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          page: 1,
        }
      });

      const { results } = response.data;

      setMovies(results);
      setOldMovies(results);
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <Loading text='Carregando filmes...' />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.grid_title}>
          <h1>Bem-Vindo(a).</h1>
          <p>Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.</p>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='search'
              id='search'
              placeholder='Pesquise pelo seu filme favorito...'
              onChange={handleChange}
              value={search || ''}
            />
            <button type='submit'>
              <FontAwesomeIcon icon={faSearch} size='xl' />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.list_movies}>
        {
          searchMovies ? (
            <div className={styles.search_movies}>
              <h2>Carregando filmes...</h2>
            </div>
          ) : (
            movies.map((movie) => (
              <article key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  {
                    movie.poster_path !== null ? (
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        effect='blur'
                        alt={movie.title}
                        title={movie.title}
                        placeholderSrc={placeholderImage}
                      />
                    ) : (
                      <img
                        src={imageNotFound}
                        alt={movie.title}
                        title={movie.title}
                      />
                    )
                  }
                </Link>
                <div className={styles.progressbar}>
                  <CircularProgressbar
                    value={movie.vote_average * 10}
                    text={`${movie.vote_average}%`}
                  />
                </div>
                <Link to={`/movie/${movie.id}`}>
                  <strong>
                    {movie.title.substring(0, 18)} {movie.title.length > 18 && '...'}
                  </strong>
                </Link>
                <p>{formatDate(movie.release_date || null)}</p>
              </article>
            ))
          )
        }
      </div>

      {
        (movies.length === 0 || movies !== oldMovies) && (
          <div className={styles.search_movies}>
            <h2 className={styles.search_h2} style={{ display: movies.length === 0 ? 'block' : 'none' }}>
              Nenhum filme foi encontrado, tente novamente...
            </h2>

            <Button
              icon={<FontAwesomeIcon icon={faBackward} size='lg' />}
              text='Voltar'
              backgroundColor='blue'
              handleOnClick={handleBack}
            />
          </div>
        )
      }
    </div>
  );
}

export default memo(Home);