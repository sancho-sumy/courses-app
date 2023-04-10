import { Link, Form, json, redirect, useActionData } from 'react-router-dom';
import { Button, Input } from '../../common';

import { REGISTRATION_BTN_TEXT } from '../../constants';
import { Alert } from '../Alert';

import styles from './Registration.module.css';

export async function action({ params, request }) {
	const data = await request.formData();
	const newUser = {
		name: data.get('name'),
		password: data.get('password'),
		email: data.get('email'),
	};

	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 400) {
		return response;
	}

	if (!response.ok) {
		throw json({ message: "Could't save user" }, { state: 500 });
	}

	return redirect('/login');
}

function Registration() {
	const data = useActionData();
	return (
		<div className={styles.registration}>
			{data && <Alert messages={data?.errors} type='error' />}
			<h2 className={styles.title}>Registration</h2>
			<Form className={styles.form} method='post'>
				<Input
					labelText='Name'
					id='name'
					name='name'
					placeholderText='Enter name'
				/>
				<Input
					labelText='Email'
					type='email'
					id='email'
					name='email'
					placeholderText='Enter email'
				/>
				<Input
					labelText='Password'
					type='password'
					id='password'
					name='password'
					placeholderText='Enter password'
				/>
				<Button buttonText={REGISTRATION_BTN_TEXT} type={'submit'} />
			</Form>
			<p className={styles.notice}>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</div>
	);
}
export default Registration;
