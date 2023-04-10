import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button, Input, Textarea } from '../../common';
import { AuthorsList } from './components';

import { getAuthors } from '../../store/selectors';
import { useDebounce } from '../../hooks';
import { pipeDuration } from '../../helpers';
import { courseSchema } from '../../schemas';
import { addNewAuthorAction } from '../../store/authors/actionCreators';
import { addNewCourseAction } from '../../store/courses/actionCreators';
import { setAlertAction } from '../../store/alert/actionCreators';
import {
	CREATE_COURSE_BTN_TEXT,
	CREATE_AUTHOR_BTN_TEXT,
	ADD_AUTHOR_BTN_TEXT,
	DELETE_AUTHOR_BTN_TEXT,
} from '../../constants';

import styles from './CreateCourse.module.css';

function CreateCourse() {
	const [course, setCourse] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	});
	const [newAuthorName, setNewAuthorName] = useState('');
	const [duration, setDuration] = useState('00:00');

	const authors = useSelector(getAuthors);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const debouncedDurationCalculation = useDebounce(course.duration, 1000);

	useEffect(() => {
		if (debouncedDurationCalculation) {
			setDuration(pipeDuration(debouncedDurationCalculation));
		}
	}, [debouncedDurationCalculation]);

	const addCourseAuthorHandler = (e) => {
		const courseAuthors = [...course.authors];
		courseAuthors.push(e);
		setCourse({ ...course, authors: [...courseAuthors] });
	};

	const deleteCourseAuthorHandler = (e) => {
		const newCourseAuthors = [...course.authors].filter(
			(authorId) => authorId !== e
		);
		setCourse({ ...course, authors: [...newCourseAuthors] });
	};

	const newAuthorSubmitHandler = (e) => {
		e.preventDefault();
		if (newAuthorName.length < 2) {
			dispatch(
				setAlertAction({
					messages: ['Author name should be at least 2 characters.'],
					type: 'error',
				})
			);
			return;
		}
		const existingAuthors = authors.map((author) => author.name);
		if (existingAuthors.includes(newAuthorName)) {
			dispatch(
				setAlertAction({
					messages: [`${newAuthorName} is already exists.`],
					type: 'error',
				})
			);
			return;
		}
		const newAuthor = {
			id: uuidv4(),
			name: newAuthorName,
		};
		dispatch(addNewAuthorAction(newAuthor));
		dispatch(
			setAlertAction({
				messages: [`${newAuthorName} added to authors list.`],
				type: 'success',
			})
		);
		setNewAuthorName('');
	};

	const inputChangeHandler = (e) => {
		const value = e.target.value;
		setCourse({
			...course,
			[e.target.name]: value,
		});
	};

	const newCourseSubmitHandler = async (e) => {
		if (
			!course.title ||
			!course.description ||
			!course.duration ||
			course.authors.lenght < 1
		) {
			alert('Please, fill all fields');
			return;
		}

		const newCourse = await courseSchema
			.validate(
				{
					...course,
					id: uuidv4(),
					creationDate: new Date().toLocaleDateString('en-GB'),
				},
				{ abortEarly: false }
			)
			.catch((err) => {
				const messages = err.inner.map((error) => error.message);
				dispatch(setAlertAction({ messages: [...messages], type: 'error' }));

			});

		if (newCourse) {
			dispatch(addNewCourseAction(newCourse));
			dispatch(
				setAlertAction({
					messages: ['New course successfully added!'],
					type: 'success',
				})
			);
			navigate('/courses');
		}
	};

	const authorsList = [...authors]
		.filter((author) => !course.authors.includes(author.id))
		.map((author) => {
			return (
				<AuthorsList
					key={author.id}
					name={author.name}
					buttonText={ADD_AUTHOR_BTN_TEXT}
					onBtnClick={addCourseAuthorHandler.bind(this, author.id)}
				/>
			);
		});

	const courseAuthorsList = course.authors.map((authorId) => {
		return (
			<AuthorsList
				key={authorId}
				id={authorId}
				name={authors.find((author) => author.id === authorId)?.name}
				buttonText={DELETE_AUTHOR_BTN_TEXT}
				onBtnClick={deleteCourseAuthorHandler.bind(this, authorId)}
			/>
		);
	});

	return (
		<div className={styles.createCourse}>
			<Input
				id='title'
				name='title'
				labelText={'Title'}
				placeholderText={'Enter title...'}
				onChange={inputChangeHandler}
				value={course.title}
				parameters={'required'}
			/>
			<Button
				buttonText={CREATE_COURSE_BTN_TEXT}
				onClick={newCourseSubmitHandler}
			/>
			<div className={styles.row2}>
				<Textarea
					id='description'
					name='description'
					labelText={'Description'}
					placeholderText={'Enter description...'}
					onChange={inputChangeHandler}
					value={course.description}
				/>
			</div>
			<div className={styles.row3}>
				<form className={styles.cell} onSubmit={newAuthorSubmitHandler}>
					<h3>Add author</h3>
					<Input
						id='author-name'
						labelText={'Author name'}
						placeholderText={'Enter author name...'}
						onChange={(e) => setNewAuthorName(e.target.value)}
						value={newAuthorName}
					/>
					<Button buttonText={CREATE_AUTHOR_BTN_TEXT} type={'submit'} />
				</form>
				<div className={styles.cell}>
					<h3>Authors</h3>
					{authorsList.length < 1 ? (
						<p className={styles.empty}>There is no any authors...</p>
					) : (
						<ul>{authorsList}</ul>
					)}
				</div>
				<div className={styles.cell}>
					<h3>Duration</h3>
					<Input
						id='duration'
						name='duration'
						labelText={'Duration'}
						placeholderText={'Enter duration in minutes...'}
						type={'number'}
						onChange={inputChangeHandler}
						value={course.duration}
					/>
					<p>
						Duration: <span>{duration}</span> hours
					</p>
				</div>
				<div className={styles.cell}>
					<h3>Course authors</h3>
					{courseAuthorsList.length < 1 ? (
						<p className={styles.empty}>Please add at least one author.</p>
					) : (
						<ul>{courseAuthorsList}</ul>
					)}
				</div>
			</div>
		</div>
	);
}
export default CreateCourse;
