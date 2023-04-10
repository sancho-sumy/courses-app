import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from 'react-router-dom';

import {
	CreateCourse,
	Courses,
	coursesLoader,
	RootLayout,
	Registration,
	registrationAction,
	Login,
	loginAction,
	CourseInfo,
	ErrorPage,
} from './components';

import { checkAuthToken, getAuthToken } from './utils/auth';

import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: 'true', loader: () => redirect('/courses') },
			{
				path: 'courses',
				loader: checkAuthToken,
				children: [
					{ index: true, element: <Courses />, loader: coursesLoader },
					{ path: 'add', element: <CreateCourse /> },
					{ path: ':courseId', element: <CourseInfo /> },
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

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
