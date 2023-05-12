import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from 'react-router-dom';

import {
	CourseForm,
	Courses,
	coursesLoader,
	RootLayout,
	Registration,
	registrationAction,
	Login,
	loginAction,
	CourseInfo,
	ErrorPage,
	PrivateRouter,
} from './components';

import { checkTokenValidity, getAuthToken } from './utils/auth';

import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		loader: checkTokenValidity,
		children: [
			{ index: 'true', loader: () => redirect('/courses') },
			{
				path: 'courses',
				loader: coursesLoader,
				children: [
					{ index: true, element: <Courses /> },
					{ path: ':courseId', element: <CourseInfo /> },
					{
						path: 'add',
						element: <PrivateRouter />,
						children: [{ index: true, element: <CourseForm /> }],
					},
					{
						path: 'update',
						element: <PrivateRouter />,

						children: [
							{
								path: ':courseId',
								element: <CourseForm />,
							},
						],
					},
				],
			},
			{
				path: 'registration',
				element: <Registration />,
				loader: () => (getAuthToken() ? redirect('/courses') : null),
				action: registrationAction,
			},
			{
				path: 'login',
				element: <Login />,
				loader: () => (getAuthToken() ? redirect('/courses') : null),
				action: loginAction,
			},
		],
	},
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
