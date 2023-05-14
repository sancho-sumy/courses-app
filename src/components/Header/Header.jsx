import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common';
import { Logo } from './components';

import { logoutUser } from '../../store/user/thunk';
import { getUser } from '../../store/selectors';
import { LOGOUT_BTN_ICON } from '../../constants';

import styles from './Header.module.css';

const Header = () => {
	const { name } = useSelector(getUser);

	const dispatch = useDispatch();
	const navigation = useNavigate();
	const location = useLocation();

	const logoutHandler = async () => {
		const response = await dispatch(logoutUser());
		if (response) {
			localStorage.removeItem('token');
			navigation('/login');
		}
	};

	return (
		<header>
			<div className={styles.logo}>
				<Logo />
			</div>
			{location.pathname !== '/login' &&
				location.pathname !== '/registration' && (
					<>
						<div className={styles.userName}>{name}</div>
						<div className={styles.avatar}>
							<span className='icon-user'></span>
						</div>
						<div className={styles.controls}>
							<Button
								buttonText={LOGOUT_BTN_ICON}
								onClick={logoutHandler}
								size='small'
								design='secondary'
							/>
						</div>
					</>
				)}
		</header>
	);
};
export default Header;
