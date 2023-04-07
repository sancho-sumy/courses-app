import { useState, useEffect } from 'react';

import { CourseCard, SearchBar } from './components';
import { Button } from '../../common/';

import styles from './Courses.module.css';

import { getAuthors, pipeDuration } from '../../helpers';

import {
	ADD_NEW_COURSE_BTN_TEXT,
	mockedCoursesList,
	mockedAuthorsList,
} from '../../constants';

function Courses({ setAddCourse, setAlert }) {
	const [courses, setCourses] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [search, setSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		try {
			if (searchPhrase && !search) {
				setSearch(false);
				return;
			}
			const fetchCoursesList = async () => {
				const response = await [...mockedCoursesList]; //! to be replaced with real request at the next step
				const fetchedCourses = response.filter((course) => {
					const regex = new RegExp(searchPhrase || '.', 'gi');
					return regex.test(course.title) || regex.test(course.id);
				});
				setCourses(fetchedCourses);
			};
			fetchCoursesList();
			setSearch(false);
			console.log('Fetching courses...');
		} catch (error) {
			setAlert({
				messages: [`There is some problems with fetching courses.`],
				type: 'error',
			});
		}
	}, [searchPhrase, search, setAlert]);

	useEffect(() => {
		try {
			const fetchAuthorsList = async () => {
				const response = await [...mockedAuthorsList]; //! to be replaced with real request at the next step
				const fetchedAuthors = response;
				setAuthors(fetchedAuthors);
			};
			fetchAuthorsList();
			console.log('Fetching authors...');
		} catch (error) {
			setAlert({
				messages: [`There is some problems with fetching authors.`],
				type: 'error',
			});
		}
	}, [setAlert]);

	const searchHandler = (e) => {
		e.preventDefault(e);
		if (searchPhrase) {
			setSearch(true);
		}
	};

	const serchInputHandler = (e) => {
		setSearchPhrase(e.target.value);
	};

	const coursesList = courses.map((course) => {
		return (
			<CourseCard
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
				<SearchBar onSubmit={searchHandler} onChange={serchInputHandler} />
				<Button
					buttonText={ADD_NEW_COURSE_BTN_TEXT}
					onClick={() => setAddCourse(true)}
				/>
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
