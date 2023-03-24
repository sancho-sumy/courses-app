import { Link, Form, redirect, useActionData, json } from 'react-router-dom';
import { Button, Input } from '../../common';
import { Alert } from '../Alert';

import { LOGIN_BTN_TEXT } from '../../constants';

import styles from './Login.module.css';

export async function action({ params, request }) {
	const data = await request.formData();
	const user = {
		password: data.get('password'),
		email: data.get('email'),
	};

	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const resData = await response.json();

	console.log(resData);

	if (response.status === 400) {
		return resData;
	}

	if (!response.ok) {
		throw json({ message: "Could't login." }, { state: 500 });
	}
	localStorage.setItem('token', resData.result);
	localStorage.setItem('user', JSON.stringify({ ...resData.user }));

	return redirect('/courses');
}

function Login() {
	const data = useActionData();

	return (
		<div className={styles.login}>
			{data && <Alert messages={data?.errors} type='error' />}
			<h2 className={styles.title}>Login</h2>
			<Form className={styles.form} method='post'>
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
				<Button buttonText={LOGIN_BTN_TEXT} type={'submit'} />
			</Form>
			<p className={styles.notice}>
				If you don't have an account, you can{' '}
				<Link to='/registration'>Register</Link>
			</p>
		</div>
	);
}
export default Login;
