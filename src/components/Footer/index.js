import styles from './styles.module.css';

function Footer() {
	const getCurrentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<p>
				<span>Prime Flix</span> &copy; {getCurrentYear}  | Desenvolvido por Lucas de Almeida Monteiro (:
			</p>
		</footer>
	);
}

export default Footer;