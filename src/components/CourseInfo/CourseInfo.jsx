import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../../common';

import { getCourses, getAuthors } from '../../store/selectors';
import { getAuthorsList, pipeDuration } from '../../helpers';
import { BACK_BTN_TEXT } from '../../constants';

import styles from './CourseInfo.module.css';

const CourseInfo = () => {
	const { courseId } = useParams();
	const courses = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);

	const course = courses.find((coourse) => coourse.id === courseId);
	const authors = getAuthorsList(course.authors, authorsList).map((author) => {
		return <li key={uuidv4()}>{author}</li>;
	});

	return (
		<>
			<div className={styles.header}>
				<Link to='..' relative='path'>
					<Button buttonText={BACK_BTN_TEXT} design='secondary' size='medium' />
				</Link>
			</div>
			<div className={styles.courseInfo}>
				<h2 className={styles.title}>{course.title}</h2>
				<div className={styles.description}>
					<p>{course.description}</p>
				</div>
				<div className={styles.info}>
					<div className={styles.infoText}>
						<p>
							<b>ID:</b> {courseId}
						</p>
						<p>
							<b>Duration:</b> {pipeDuration(course.duration)} hours
						</p>
						<p>
							<b>Created:</b> {course.creationDate}
						</p>
					</div>
					<div className={styles.infoAuthors}>
						<p>
							<b>Authors:</b>
						</p>
						<ul>{authors}</ul>
					</div>
				</div>
			</div>
		</>
	);
};
export default CourseInfo;
