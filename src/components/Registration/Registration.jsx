import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { Button, Input } from '../../common';

import { authRequest } from '../../services';
import { REGISTRATION_BTN_TEXT, LOADING_BTN_SPINNER } from '../../constants';

import styles from './Registration.module.css';

export const action = async ({ params, request }) => {
	const data = await request.formData();
	const newUser = {
		name: data.get('name'),
		password: data.get('password'),
		email: data.get('email'),
	};

	const registrationResponse = await authRequest('register', newUser);

	if (registrationResponse) {
		return redirect('/login');
	} else {
		return null;
	}
};

const Registration = () => {
	const navigation = useNavigation();

	return (
		<div className={styles.registration}>
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
				<Button
					buttonText={
						navigation.state === 'idle'
							? REGISTRATION_BTN_TEXT
							: LOADING_BTN_SPINNER
					}
					type={'submit'}
					isDisabled={navigation.state !== 'idle'}
				/>
			</Form>
			<p className={styles.notice}>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};
export default Registration;
