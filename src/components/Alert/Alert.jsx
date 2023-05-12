import { useLayoutEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from './Alert.module.css';

const Alert = ({ messages, type = 'success' }) => {
	const [inAnimation, setInAnimation] = useState(false);

	useLayoutEffect(() => {
		setInAnimation(true);
	}, []);

	const messageList = messages?.map((message) => {
		return <li key={uuidv4()}>{message}</li>;
	});
	return (
		<ul
			className={clsx(styles.messageList, {
				[styles.slideInTop]: inAnimation,
				[styles.error]: type === 'error',
				[styles.success]: type === 'success',
			})}
		>
			{messageList}
		</ul>
	);
};
export default Alert;
