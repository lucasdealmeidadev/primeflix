import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

function Error() {
  return (
    <div className={styles.not_found}>
			<h1>404</h1>
      <h2>Oops! Página não encontrada</h2>
			<Link to='/'>
				<FontAwesomeIcon icon={faArrowRotateBackward} size='lg'/> Veja todos os filmes
			</Link>
    </div>
  );
}

export default memo(Error);