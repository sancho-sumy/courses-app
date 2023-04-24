import * as Yup from 'yup';

export const courseSchema = Yup.object({
	title: Yup.string()
		.trim()
		.min(2, 'Title should be at least 2 characters.')
		.required('Title is required'),
	description: Yup.string()
		.trim()
		.min(2, 'Description should be at least 2 characters.')
		.required('Description is required'),
	duration: Yup.number()
		.positive('Duration should be more than 0 minute.')
		.integer('Duration should be integer.')
		.required('Duration is required'),
	authors: Yup.array().min(1, 'At least one author should be added.'),
});
