import { Link, useSubmit, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CourseCard, SearchBar } from './components';
import { Button } from '../../common/';

import store from '../../store';
import { getAuthorsList, pipeDuration } from '../../helpers';
import { getAllItemsRequest } from '../../services';
import { getCourses, getAuthors, getUser } from '../../store/selectors';
import { getAuthToken } from '../../utils/auth';
import { setAuthorsAction } from '../../store/authors/actionCreators';
import { setCoursesAction } from '../../store/courses/actionCreators';
import { ADD_NEW_COURSE_BTN_TEXT } from '../../constants';

import styles from './Courses.module.css';

export async function loader({ request }) {
	const token = getAuthToken();

	if (!token) {
		return redirect('/login');
	}

	const url = new URL(request.url);
	const searchPhrase = url.searchParams.get('q');

	const coursesResponse = await getAllItemsRequest('courses');
	const courses = coursesResponse.filter((course) => {
		const regex = new RegExp(searchPhrase || '.', 'i');
		return regex.test(course.title) || regex.test(course.id);
	});

	const authorsResponse = await getAllItemsRequest('authors');
	const authors = authorsResponse;

	store.dispatch(setCoursesAction(courses));
	store.dispatch(setAuthorsAction(authors));

	return { courses, authors };
}

function Courses() {
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const { role } = useSelector(getUser);

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
				authors={getAuthorsList(course.authors, authors)
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
				{role === 'admin' && (
					<Link to='add'>
						<Button buttonText={ADD_NEW_COURSE_BTN_TEXT} />
					</Link>
				)}
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
