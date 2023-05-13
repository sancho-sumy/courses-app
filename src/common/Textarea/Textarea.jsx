import styles from './Textarea.module.css';

export const Textarea = ({
	id,
	name,
	placeholderText,
	defaultValue,
	value,
	labelText,
	onChange,
}) => {
	return (
		<div className={styles.container}>
			{labelText && <label htmlFor={id}>{labelText}</label>}
			<textarea
				id={id}
				name={name}
				placeholder={placeholderText}
				onChange={onChange}
				defaultValue={defaultValue}
				value={value}
			/>
		</div>
	);
};
