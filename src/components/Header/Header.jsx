import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common';
import { Logo } from './components';

import { getUserName } from '../../store/selectors';
import { logoutUserAction } from '../../store/user/actionCreators';
import { LOGOUT_BTN_TEXT } from '../../constants';

import styles from './Header.module.css';

function Header() {
	const userName = useSelector(getUserName);
	const dispatch = useDispatch();

	const navigation = useNavigate();

	const logoutHandler = () => {
		localStorage.removeItem('token');
		dispatch(logoutUserAction());
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
