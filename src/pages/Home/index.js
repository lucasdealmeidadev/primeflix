import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import api from '../../services/api';

function Home() {
  const [movies, setMovies] = useState([]);

  const formatDate = (value) => {
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

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: '29635cea469d75e2285ac15ee8e2356e',
          language: 'pt-BR',
          page: 1
        }
      });

      const { results } = response.data;
      setMovies(results);
    }

    loadMovies();
  }, []);

  return (
    <div className='container'>
      <div className={styles.list_movies}>
        {
          movies.map((movie) => (
            <article key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} title={movie.title} />
              </Link>
              <Link to={`/movie/${movie.id}`}>
                <strong>
                  {movie.title.substr(0, 21)} {movie.title.length > 21 && '...'}
                </strong>
              </Link>
              <p>{formatDate(movie.release_date)}</p>
            </article>
          ))
        }
      </div>
    </div >
  );
}

export default Home;