import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link className={styles.logo} to='/'>Prime Flix</Link>
      <Link className={styles.favorites} to='/favorites'>Meus Filmes</Link>
    </header>
  );
}

export default Header;