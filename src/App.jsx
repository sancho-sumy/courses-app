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

import { checkAuthToken, checkTokenValidity } from './utils/auth';

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
					{ path: 'add', element: <CreateCourse /> },
					{ path: ':courseId', element: <CourseInfo /> },
				],
			},
			{
				path: 'registration',
				element: <Registration />,
				action: registrationAction,
			},
			{
				path: 'login',
				element: <Login />,
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
