import styles from './Textarea.module.css';

function Textarea({ id, name, value, placeholderText, labelText, onChange }) {
	return (
		<div className={styles.container}>
			{labelText && <label htmlFor={name}>{labelText}</label>}
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
export default Textarea;
