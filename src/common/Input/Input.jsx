export const Input = ({
	id,
	name,
	type,
	value,
	placeholderText,
	labelText,
	onChange,
}) => {
	return (
		<div>
			{labelText && <label htmlFor={id}>{labelText}</label>}
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
};
