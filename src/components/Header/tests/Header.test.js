import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: 'test@test.com',
		role: 'admin',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test("Header should have logo and user's name", () => {
	render(
		<Provider store={mockedStore}>
			<Header />
		</Provider>,
		{ wrapper: BrowserRouter }
	);
	const userName = screen.queryByText('Test Name');
	const logo = screen.queryByAltText('App Logo');

	expect(userName).toBeInTheDocument();
	expect(logo).toBeInTheDocument();
});
