import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faVideo } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

function Favorites() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const myList = localStorage.getItem('@primeflix');
		setMovies(JSON.parse(myList) || []);
	}, []);

	function removeMovie(id) {
		let filterMovies = movies.filter((movie) => {
			return (movie.id !== id)
		});

		setMovies(filterMovies);

		localStorage.setItem('@primeflix', JSON.stringify(filterMovies));
	}

	return (
		<div className={styles.container}>
			<div className={styles.my_movies}>
				<h1>Meus Filmes</h1>
				{movies.length === 0 && (
					<span>Você não possui nenhum filme salvo :(</span>
				)}
				<ul>
					{movies.map((movie) => (
						<li key={movie.id}>
							<span>{movie.title}</span>
							<div className={styles.area_buttons}>
								<Link to={`/movie/${movie.id}`}>
									<FontAwesomeIcon icon={faVideo} size='xs' /> Detalhes
								</Link>

								<button onClick={() => removeMovie(movie.id)}>
									<FontAwesomeIcon icon={faRemove} size='xs' /> Excluir
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Favorites;