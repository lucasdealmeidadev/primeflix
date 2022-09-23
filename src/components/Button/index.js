import PropTypes from 'prop-types';
import styles from './styles.module.css';

function Button({ icon, text, backgroundColor, handleOnClick }) { 
  return (
    <button 
      className={`${styles.button} ${styles[backgroundColor]}`}
      onClick={handleOnClick}
    >
      {icon} {text}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func
}

export default Button;