import PropTypes from 'prop-types';
import styles from './styles.module.css';
import loadingImage from '../../assets/images/loading.svg';

function Loading({ text }) {
  return (
    <div className={styles.loading}>
      <img 
        src={loadingImage} 
        alt={text} 
        width={30} 
        height={30}
      />

      <h2>{text}</h2>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

export default Loading;