import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../common';

import styles from './CourseInfo.module.css';

import {
	mockedAuthorsList,
	mockedCoursesList,
	BACK_TO_COURSES_BTN_TEXT,
} from '../../constants';
import getAuthors from '../../helpers/getAuthorsList';
import pipeDuration from '../../helpers/pipeDuration';

function CourseInfo() {
	let { courseId } = useParams();

	const course = mockedCoursesList.find((coourse) => coourse.id === courseId);
	const authors = getAuthors(course.authors, mockedAuthorsList).map(
		(author) => {
			return <li key={uuidv4()}>{author}</li>;
		}
	);

	return (
		<div className={styles.courseInfo}>
			<div className={styles.controls}>
				<Link to='..' relative='path'>
					<Button buttonText={BACK_TO_COURSES_BTN_TEXT} />
				</Link>
			</div>
			<h2 className={styles.title}>{course.title}</h2>
			<div className={styles.description}>
				<p>{course.description}</p>
			</div>
			<div className={styles.info}>
				<p>
					<b>ID:</b> {courseId}
				</p>
				<p>
					<b>Duration:</b> {pipeDuration(course.duration)} hours
				</p>
				<p>
					<b>Created:</b> {course.creationDate}
				</p>
				<p>
					<b>Authors:</b>
				</p>
				<div>
					<ul>{authors}</ul>
				</div>
			</div>
		</div>
	);
}
export default CourseInfo;
