import { useEffect, useState } from 'react';

import { Header, CreateCourse, Courses, Alert } from './components';

import './App.css';

function App() {
	const [addCourse, setAddCourse] = useState(false);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => setAlert(null), 5000);
		return () => clearTimeout(timer);
	}, [alert]);

	return (
		<>
			{alert && <Alert alert={alert} />}
			<Header />
			{!addCourse ? (
				<Courses setAddCourse={setAddCourse} setAlert={setAlert} />
			) : (
				<CreateCourse setAddCourse={setAddCourse} setAlert={setAlert} />
			)}
		</>
	);
}

export default App;
