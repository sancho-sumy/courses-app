import { Button } from '../../common/Button';
import { Logo } from './components';

import { LOGOUT_BTN_TEXT, GUEST_NAME } from '../../constants';

import styles from './Header.module.css';

function Header() {
	return (
		<header>
			<div className={styles.logo}>
				<Logo />
			</div>
			<div className={styles.userName}>{GUEST_NAME}</div>
			<div className={styles.controls}>
				<Button buttonText={LOGOUT_BTN_TEXT} />
			</div>
		</header>
	);
}
export default Header;
