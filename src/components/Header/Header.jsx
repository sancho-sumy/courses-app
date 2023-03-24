import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../common';
import { Logo } from './components';

import { LOGOUT_BTN_TEXT } from '../../constants';

import styles from './Header.module.css';

function Header() {
	const navigation = useNavigate();

	const userName = JSON.parse(localStorage.getItem('user'))?.name || 'Guest';

	const logoutHandler = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigation('/login');
	};

	let location = useLocation();
	return (
		<header>
			<div className={styles.logo}>
				<Logo />
			</div>
			{location.pathname !== '/login' &&
				location.pathname !== '/registration' && (
					<>
						<div className={styles.userName}>{userName}</div>
						<div className={styles.controls}>
							<Button buttonText={LOGOUT_BTN_TEXT} onClick={logoutHandler} />
						</div>
					</>
				)}
		</header>
	);
}
export default Header;
