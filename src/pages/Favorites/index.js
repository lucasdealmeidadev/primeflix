import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Favorites() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const myList = localStorage.getItem('@primeflix');
		setMovies(JSON.parse(myList) || []);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.my_movies}>
				<h1>Meus Filmes</h1>
				<ul>
					{movies.map((movie) => (
						<li key={movie.id}>
							<span>{movie.title}</span>
							<div>
								<Link to={`/movie/${movie.id}`}>
									Ver Detalhes
								</Link>

								<button>Excluir</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Favorites;