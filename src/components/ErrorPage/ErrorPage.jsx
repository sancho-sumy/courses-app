import { Link, useRouteError } from 'react-router-dom';
import { Button } from '../../common';
import { BACK_TO_MAIN_PAGE_BTN_TEXT } from '../../constants';

import { Header } from '../Header';

import styles from './ErrorPage.module.css';

export const ErrorPage = () => {
	const error = useRouteError();

	let title = 'An error occured!';
	let message = 'Something went wrong!';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not found!';
		message = 'Could not found resource or page.';
	}
	return (
		<div className={styles.errorPage}>
			<Header />
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.message}>{message}</p>
			<div className={styles.controls}>
				<Link to='/'>
					<Button buttonText={BACK_TO_MAIN_PAGE_BTN_TEXT} />
				</Link>
			</div>
		</div>
	);
};
