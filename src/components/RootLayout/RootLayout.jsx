import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getAlert } from '../../store/selectors';
import { Header } from '../Header';
import { Alert } from '../Alert';
import { useEffect } from 'react';
import { deleteAlertAction } from '../../store/alert/actionCreators';

const RootLayout = () => {
	const alert = useSelector(getAlert);
	const dispatch = useDispatch();

	useEffect(() => {
		if (alert.messages.length > 0) {
			setTimeout(() => {
				dispatch(deleteAlertAction());
			}, 8000);
		}
	});

	return (
		<>
			{alert.messages.length > 0 && (
				<Alert messages={alert.messages} type={alert.type} />
			)}
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
