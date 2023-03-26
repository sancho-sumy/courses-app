import clsx from 'clsx';
import styles from './Button.module.css';

export function Button({
	type = 'button',
	buttonText,
	onClick,
	size = 'standard',
}) {
	return (
		<button
			className={clsx(styles.btn, {
				[styles.standard]: size === 'standard',
				[styles.small]: size === 'small',
			})}
			type={type}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
}
