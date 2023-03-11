import { useState } from 'react';
import { Button, Input, Textarea } from '../../common/';
import {
	CREATE_COURSE_BTN_TEXT,
	CREATE_AUTHOR_BTN_TEXT,
} from '../../constants';
import { AuthorsList } from './components';
import styles from './CreateCourse.module.css';

function CreateCourse() {
	return (
		<div className={styles.container}>
			<Input labelText={'Title'} placeholderText={'Enter title...'} />
			<Button buttonText={CREATE_COURSE_BTN_TEXT} />
			<div className={styles.row2}>
				<Textarea
					type={'text-area'}
					labelText={'Description'}
					placeholderText={'Enter description...'}
				/>
			</div>
			<div className={styles.row3}>
				<div className={styles.cell}>
					<h3>Add author</h3>
					<Input
						labelText={'Author name'}
						placeholderText={'Enter author name...'}
					/>
					<Button buttonText={CREATE_AUTHOR_BTN_TEXT} />
				</div>
				<div className={styles.cell}>
					<h3>Authors</h3>
					<ul>
						<AuthorsList />
					</ul>
				</div>
				<div className={styles.cell}>
					<h3>Duration</h3>
					<Input
						labelText={'Duration'}
						placeholderText={'Enter duration in minutes...'}
					/>
					<p>
						Duration: <span>00:00</span> hours
					</p>
				</div>
				<div className={styles.cell}>
					<h3>Course authors</h3>
				</div>
			</div>
		</div>
	);
}
export default CreateCourse;
