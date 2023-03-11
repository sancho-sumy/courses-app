function Input({
	id,
	name,
	type,
	value,
	placeholderText,
	labelText,
	onChange,
}) {
	return (
		<div>
			{labelText && <label htmlFor={name}>{labelText}</label>}
			<input
				id={id}
				type={type || 'text'}
				name={name}
				value={value}
				placeholder={placeholderText}
				onChange={onChange}
			/>
		</div>
	);
}
export default Input;
