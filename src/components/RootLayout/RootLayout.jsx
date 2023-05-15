import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getAlert } from '../../store/selectors';

import { Header } from '../Header';
import { Alert } from '../../common';

const RootLayout = () => {
	const alert = useSelector(getAlert);

	const portalElement = document.getElementById('overlays');

	return (
		<>
			{alert.messages.length > 0 && createPortal(<Alert />, portalElement)}
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
