import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from '../../../../common';

import { deleteCourseAction } from '../../../../store/courses/actionCreators';
import { setAlertAction } from '../../../../store/alert/actionCreators';
import {
	DELETE_BTN_ICON,
	EDIT_BTN_ICON,
	SHOW_COURSE_BTN_TEXT,
} from '../../../../constants';

import styles from './CourseCard.module.css';

export function CourseCard({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
}) {
	const dispatch = useDispatch();

	const deleteCourseHandler = (courseId) => {
		dispatch(deleteCourseAction(courseId));
		dispatch(
			setAlertAction({
				messages: [`Course deleted successfully.`],
				type: 'success',
			})
		);
	};

	return (
		<div className={styles.course}>
			<div className={styles.description}>
				<h2 className={styles.title}>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.info}>
				<p>
					<span>Authors:</span> {authors}
				</p>
				<p>
					<span>Duration:</span> {duration}
				</p>
				<p>
					<span>Created:</span> {creationDate}
				</p>
				<div className={styles.controls}>
					<Link to={id}>
						<Button buttonText={SHOW_COURSE_BTN_TEXT} />
					</Link>
					<Button buttonText={EDIT_BTN_ICON} size='small' />
					<Button
						buttonText={DELETE_BTN_ICON}
						onClick={deleteCourseHandler.bind(this, id)}
						size='small'
					/>
				</div>
			</div>
		</div>
	);
}
