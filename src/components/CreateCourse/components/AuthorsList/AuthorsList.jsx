import { Button } from '../../../../common';

import styles from './AuthorsList.module.css';

function AuthorsList({ name, buttonText, onBtnClick }) {
	return (
		<div>
			<li className={styles.listItem}>
				<p className={styles.name}>{name}</p>
				<div className={styles.controls}>
					<Button buttonText={buttonText} onClick={onBtnClick} />
				</div>
			</li>
		</div>
	);
}
export default AuthorsList;
