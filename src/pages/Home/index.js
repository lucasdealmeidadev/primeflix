import { useEffect, useState } from 'react';
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

      console.log(response.data.results);
    }

    loadMovies();
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;