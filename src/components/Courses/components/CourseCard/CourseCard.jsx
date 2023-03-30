import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../../common';

import { getUser } from '../../../../store/selectors';
import { deleteCourse } from '../../../../store/courses/thunk';
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
	const { role } = useSelector(getUser);
	const dispatch = useDispatch();

	const deleteCourseHandler = async (courseId) => {
		dispatch(deleteCourse(courseId));
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
					{role === 'admin' && (
						<>
							<Link to={`update/${id}`}>
								<Button buttonText={EDIT_BTN_ICON} size='small' />
							</Link>
							<Button
								buttonText={DELETE_BTN_ICON}
								onClick={deleteCourseHandler.bind(this, id)}
								size='small'
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
