import { Header } from '../Header';

import styles from './ErrorPage.module.css';

export function ErrorPage() {
	return (
		<div className={styles.errorPage}>
			<Header />
			<h2 className={styles.title}>An error occured!</h2>
			<p>Could not find this page!</p>
		</div>
	);
}
