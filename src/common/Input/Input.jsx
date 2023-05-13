export const Input = ({
	id,
	name,
	type,
	defaultValue,
	value,
	placeholderText,
	labelText,
	onChange,
	min,
	max,
}) => {
	return (
		<div>
			{labelText && <label htmlFor={id}>{labelText}</label>}
			<input
				id={id}
				name={name}
				type={type || 'text'}
				defaultValue={defaultValue}
				value={value}
				placeholder={placeholderText}
				onChange={onChange}
				min={min}
				max={max}
			/>
		</div>
	);
};
