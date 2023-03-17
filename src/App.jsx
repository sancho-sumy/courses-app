import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
	CreateCourse,
	Courses,
	Alert,
	RootLayout,
	Registration,
	Login,
	CourseInfo,
	ErrorPage,
} from './components';

import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'courses',
				children: [
					{ index: true, element: <Courses /> },
					{ path: 'add', element: <CreateCourse /> },
					{ path: ':courseId', element: <CourseInfo /> },
				],
			},
			{
				path: 'registration',
				element: <Registration />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

function App() {
	// const [addCourse, setAddCourse] = useState(false);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => setAlert(null), 5000);
		return () => clearTimeout(timer);
	}, [alert]);

	return (
		<>
			{alert && <Alert alert={alert} />}
			<RouterProvider router={router} />
			{/* <Header />
			{!addCourse ? (
				<Courses setAddCourse={setAddCourse} setAlert={setAlert} />
			) : (
				<CreateCourse setAddCourse={setAddCourse} setAlert={setAlert} />
			)} */}
		</>
	);
}

export default App;
