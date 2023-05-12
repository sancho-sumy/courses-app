import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({
	type = 'button',
	buttonText,
	onClick,
	size = 'standard',
	design = 'primary',
}) => {
	return (
		<button
			className={clsx(styles.btn, {
				[styles.standard]: size === 'standard',
				[styles.small]: size === 'small',
				[styles.primary]: design === 'primary',
				[styles.secondary]: design === 'secondary',
			})}
			type={type}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
};
