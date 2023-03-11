import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse';
import { useState } from 'react';

function App() {
	const [addCourse, setAddCourse] = useState(false);

	return (
		<>
			<Header />
			{!addCourse ? <Courses setAddCourse={setAddCourse} /> : <CreateCourse />}
		</>
	);
}

export default App;
