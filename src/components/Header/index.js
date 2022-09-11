import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link className={styles.logo} to='/'>Prime Flix</Link>
      <Link className={styles.favorites} to='/favorites'>
        <FontAwesomeIcon icon={faUserCircle} size='lg'/> Meus Filmes
      </Link>
    </header>
  );
}

export default Header;