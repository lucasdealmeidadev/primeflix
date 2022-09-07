import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import api from '../../services/api';

function Home() {
  const [movies, setMovies] = useState([]);

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
      setMovies(results.slice(0, 15));
    }

    loadMovies();
  }, []);

  return (
    <div className='container'>
      <div className={styles.list_movies}>
        {
          movies.map((movie) => (
            <article key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <strong>
                {movie.title.substr(0, 17)} {movie.title.length > 17 && '...'}
              </strong>
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          ))
        }
      </div>
    </div>
  );
}

export default Home;