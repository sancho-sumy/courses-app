import styles from './Textarea.module.css';

export function Textarea({
	id,
	name,
	value,
	placeholderText,
	labelText,
	onChange,
}) {
	return (
		<div className={styles.container}>
			{labelText && <label htmlFor={id}>{labelText}</label>}
			<textarea
				id={id}
				name={name}
				value={value}
				placeholder={placeholderText}
				onChange={onChange}
			/>
		</div>
	);
}
