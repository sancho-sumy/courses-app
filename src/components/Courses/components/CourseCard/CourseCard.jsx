import { Button } from '../../../../common';

import styles from './CourseCard.module.css';

import { SHOW_COURSE_BTN_TEXT } from '../../../../constants';

export function CourseCard({
	title,
	description,
	authors,
	duration,
	creationDate,
}) {
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
					<Button buttonText={SHOW_COURSE_BTN_TEXT} />
				</div>
			</div>
		</div>
	);
}
