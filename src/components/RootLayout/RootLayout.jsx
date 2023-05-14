import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getAlert } from '../../store/selectors';
import { Header } from '../Header';
import { Alert } from '../Alert';

const RootLayout = () => {
	const alert = useSelector(getAlert);

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
