import { useLayoutEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from './Alert.module.css';

function Alert({ alert }) {
	const [inAnimation, setInAnimation] = useState(false);

	useLayoutEffect(() => {
		setInAnimation(true);
	}, []);

	const messageList = alert?.messages.map((message) => {
		return <li key={uuidv4()}>{message}</li>;
	});
	return (
		<ul
			className={clsx(styles.messageList, {
				[styles.slideInTop]: inAnimation,
				[styles.error]: alert?.type === 'error',
				[styles.success]: alert?.type === 'success',
			})}
		>
			{messageList}
		</ul>
	);
}
export default Alert;
