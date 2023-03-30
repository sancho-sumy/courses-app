import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUser } from '../../store/selectors';

const PrivateRouter = () => {
	const { role } = useSelector(getUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (role !== 'admin') {
			navigate('/courses');
		}
	}, [navigate, role]);

	return <Outlet />;
};

export default PrivateRouter;
