import { Link, useLoaderData, useSubmit } from 'react-router-dom';

import { CourseCard, SearchBar } from './components';
import { Button } from '../../common/';

import { getAuthors, pipeDuration } from '../../helpers';

import {
	ADD_NEW_COURSE_BTN_TEXT,
	mockedCoursesList,
	mockedAuthorsList,
} from '../../constants';

import styles from './Courses.module.css';
import { getAuthToken } from '../../utils/auth';

export async function loader({ request }) {
	const token = getAuthToken();

	if (!token) {
		return;
	}

  const url = new URL(request.url);
	const searchPhrase = url.searchParams.get('q');

	const coursesResponse = await [...mockedCoursesList]; //! to be replaced with real request at the next step
	const courses = coursesResponse.filter((course) => {
		const regex = new RegExp(searchPhrase || '.', 'i');
		return regex.test(course.title) || regex.test(course.id);
	});

	const authorsResponse = await [...mockedAuthorsList]; //! to be replaced with real request at the next step
	const authors = authorsResponse;

	return { courses, authors };
}

function Courses() {
	const { courses, authors } = useLoaderData();
	const submit = useSubmit();

	const serchInputHandler = (e) => {
		if (!e.target.value) {
			submit(e.currentTarget.form);
		}
	};

	const coursesList = courses.map((course) => {
		return (
			<CourseCard
				id={course.id}
				title={course.title}
				description={course.description}
				authors={getAuthors(course.authors, authors)
					.map((author) => (author ? author : 'N/A'))
					.join(', ')}
				duration={pipeDuration(course.duration) + ' hours'}
				creationDate={course.creationDate}
				key={course.id}
			/>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SearchBar onChange={serchInputHandler} />
				<Link to='add'>
					<Button buttonText={ADD_NEW_COURSE_BTN_TEXT} />
				</Link>
			</div>
			{coursesList.length < 1 ? (
				<p className={styles.empty}>There is no any courses...</p>
			) : (
				coursesList
			)}
		</div>
	);
}

export default Courses;
