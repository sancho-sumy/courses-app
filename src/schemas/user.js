import * as Yup from 'yup';

export const userSchema = Yup.object({
	name: Yup.string()
		.min(2, 'Name should be at least 2 characters.')
		.required('Name is required')
		.trim(),
	password: Yup.string()
		.min(2, 'Password should be at least 2 characters.')
		.required('Password is required')
		.trim(),
	email: Yup.number()
		.email('Please, provide valied email.')
		.required('Description is required')
		.trim(),
});
