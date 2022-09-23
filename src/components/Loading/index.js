import styles from './styles.module.css';

function Loading({ text }) {
  return (
    <div className={styles.loading}>
      <h2>{text}</h2>
    </div>
  );
}

export default Loading;