import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlert } from '../../store/selectors';
import { deleteAlertAction } from '../../store/alert/actionCreators';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from './Alert.module.css';

const Alert = () => {
	const { messages, type } = useSelector(getAlert);
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(deleteAlertAction());
		}, 8000);
		return () => {
			clearTimeout(timer);
		};
	});

	const messageList = messages?.map((message) => {
		return <li key={uuidv4()}>{message}</li>;
	});

	return (
		<div
			className={clsx(styles.alert, {
				[styles.error]: type === 'error',
				[styles.success]: type === 'success',
			})}
		>
			<ul className={styles.messageList}>{messageList}</ul>
			<div
				className={styles.close}
				onClick={() => {
					dispatch(deleteAlertAction());
				}}
			>
				X
			</div>
		</div>
	);
};
export default Alert;
