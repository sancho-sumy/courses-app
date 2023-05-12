import { Button } from '../../../../common';

import styles from './AuthorsList.module.css';

const AuthorsList = ({ name, buttonText, onBtnClick }) => {
	return (
		<li className={styles.listItem}>
			<p className={styles.name}>{name}</p>
			<div className={styles.controls}>
				<Button buttonText={buttonText} onClick={onBtnClick} />
			</div>
		</li>
	);
};
export default AuthorsList;
