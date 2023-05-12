import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { Button, Input } from '../../common';

import store from '../../store';
import { loginUserAction } from '../../store/user/actionCreators';
import { authRequest } from '../../services';

import { LOADING_BTN_SPINNER, LOGIN_BTN_TEXT } from '../../constants';

import styles from './Login.module.css';

export const action = async ({ _params, request }) => {
	const data = await request.formData();
	const user = {
		password: data.get('password'),
		email: data.get('email'),
	};

	const loginResponse = await authRequest('login', user);

	const resData = loginResponse;

	if (resData) {
		store.dispatch(
			loginUserAction({
				name: resData.user.name,
				email: resData.user.email,
				role: resData.user.role,
				token: resData.result,
			})
		);

		localStorage.setItem('token', resData.result);

		return redirect('/courses');
	} else {
		return null;
	}
};

const Login = () => {
	const navigation = useNavigation();
	return (
		<div className={styles.login}>
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
				<Button
					buttonText={
						navigation.state === 'idle' ? LOGIN_BTN_TEXT : LOADING_BTN_SPINNER
					}
					type={'submit'}
					isDisabled={navigation.state !== 'idle'}
				/>
			</Form>
			<p className={styles.notice}>
				If you don't have an account, you can{' '}
				<Link to='/registration'>Register</Link>
			</p>
		</div>
	);
};
export default Login;
