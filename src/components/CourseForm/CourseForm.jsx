import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import { Button, Input, Modal, Textarea } from '../../common';
import { AddNewAuthor, AuthorsList } from './components';

import { addNewCourse, updateCourse } from '../../store/courses/thunk';
import { getAuthors, getCourses, getModal } from '../../store/selectors';
import { setAlertAction } from '../../store/alert/actionCreators';
import {
	closeModalAction,
	openModalAction,
} from '../../store/modal/actionCreators';
import { useDebounce } from '../../hooks';
import { pipeDuration } from '../../helpers';
import { courseSchema } from '../../schemas';
import {
	CREATE_COURSE_BTN_TEXT,
	ADD_AUTHOR_BTN_TEXT,
	UPDATE_COURSE_BTN_TEXT,
	BACK_BTN_TEXT,
	LOADING_BTN_SPINNER,
	REMOVE_BTN_TEXT,
	EDIT_BTN_ICON,
} from '../../constants';

import styles from './CourseForm.module.css';

const CourseForm = () => {
	const { courseId } = useParams();

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const modal = useSelector(getModal);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const course = courses.find((coourse) => coourse.id === courseId) || {
		title: '',
		description: '',
		duration: 0,
		authors: [],
	};

	const [courseAuthors, setCourseAuthors] = useState([...course.authors]);

	const [duration, setDuration] = useState(course.duration);
	const [durationFormated, setDurationFormated] = useState('00:00');
	const [isLoading, setIsLoading] = useState(false);

	const debouncedDurationCalculation = useDebounce(duration, 1000);

	useEffect(() => {
		if (debouncedDurationCalculation) {
			setDurationFormated(pipeDuration(debouncedDurationCalculation));
		}
	}, [debouncedDurationCalculation]);

	const addCourseAuthorHandler = useCallback(
		(e) => {
			const newCourseAuthors = [...courseAuthors];
			newCourseAuthors.push(e);
			setCourseAuthors([...newCourseAuthors]);
		},
		[courseAuthors]
	);

	const deleteCourseAuthorHandler = useCallback(
		(e) => {
			const newCourseAuthors = [...courseAuthors].filter(
				(authorId) => authorId !== e
			);
			setCourseAuthors([...newCourseAuthors]);
		},
		[courseAuthors]
	);

	const courseSubmitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const title = formData.get('title');
		const description = formData.get('description');
		const duration = formData.get('duration');
		const authors = [...courseAuthors];

		if (!title || !description || !duration || authors.lenght > 1) {
			alert('Please, fill all fields');
			return;
		}

		const validatedCourse = await courseSchema
			.validate(
				{
					title: title,
					description: description,
					duration: duration,
					authors: authors,
				},
				{ abortEarly: false }
			)
			.catch((err) => {
				const messages = err.inner.map((error) => error.message);
				dispatch(setAlertAction({ messages: [...messages], type: 'error' }));
			});

		if (validatedCourse) {
			setIsLoading(true);
			const response =
				location.pathname === '/courses/add'
					? await dispatch(addNewCourse(validatedCourse))
					: await dispatch(updateCourse(validatedCourse, courseId));

			if (response) {
				navigate('/courses');
			}
			setIsLoading(false);
		}
	};

	const authorsList = useMemo(() => {
		return [...authors]
			.filter((author) => !courseAuthors.includes(author.id))
			.map((author) => {
				return (
					<CSSTransition
						key={author.id}
						classNames={{ ...styles }}
						timeout={400}
					>
						<AuthorsList
							name={author.name}
							buttonText={ADD_AUTHOR_BTN_TEXT}
							onBtnClick={addCourseAuthorHandler.bind(this, author.id)}
						/>
					</CSSTransition>
				);
			});
	}, [addCourseAuthorHandler, authors, courseAuthors]);

	const courseAuthorsList = useMemo(() => {
		return courseAuthors.map((authorId) => {
			return (
				<CSSTransition key={authorId} classNames={{ ...styles }} timeout={400}>
					<AuthorsList
						id={authorId}
						name={authors.find((author) => author.id === authorId)?.name}
						buttonText={REMOVE_BTN_TEXT}
						onBtnClick={deleteCourseAuthorHandler.bind(this, authorId)}
					/>
				</CSSTransition>
			);
		});
	}, [authors, courseAuthors, deleteCourseAuthorHandler]);

	return (
		<>
			<div className={styles.header}>
				<div>
					<Link to='/courses'>
						<Button
							buttonText={BACK_BTN_TEXT}
							design='secondary'
							size='medium'
						/>
					</Link>
				</div>
			</div>
			<div className={styles.courseForm}>
				<form onSubmit={courseSubmitHandler} className={styles.course}>
					<div className={styles.title}>
						<Input
							id='title'
							name='title'
							labelText={'Title'}
							placeholderText={'Enter title'}
							defaultValue={course.title}
							parameters={'required'}
						/>
					</div>
					<div className={styles.createButton}>
						{location.pathname === '/courses/add' && (
							<Button
								buttonText={
									!isLoading ? CREATE_COURSE_BTN_TEXT : LOADING_BTN_SPINNER
								}
								type='submit'
								isDisabled={isLoading}
							/>
						)}
						{location.pathname === `/courses/update/${courseId}` && (
							<Button
								buttonText={
									!isLoading ? UPDATE_COURSE_BTN_TEXT : LOADING_BTN_SPINNER
								}
								type='submit'
								isDisabled={isLoading}
							/>
						)}
					</div>
					<div className={styles.description}>
						<Textarea
							id='description'
							name='description'
							labelText={'Description'}
							placeholderText={'Enter description'}
							defaultValue={course.description}
						/>
					</div>
					<div className={styles.duration}>
						<Input
							id='duration'
							name='duration'
							labelText={'Duration'}
							placeholderText={'Duration in minutes'}
							type={'number'}
							min='0'
							onChange={(e) => setDuration(e.target.value)}
							defaultValue={duration}
						/>
						<span>{durationFormated} hours</span>
					</div>
				</form>
				<div className={styles.authors}>
					<div className={styles.availableAuthors}>
						<div className={styles.title}>
							<span className={styles.text}>Available authors</span>
							<span className={styles.controls}>
								<Button
									buttonText={EDIT_BTN_ICON}
									size='small'
									design='secondary'
									onClick={() => dispatch(openModalAction())}
								></Button>
							</span>
						</div>
						{authorsList.length < 1 ? (
							<p className={styles.empty}>There is no any authors...</p>
						) : (
							<TransitionGroup component='ul'>{authorsList}</TransitionGroup>
						)}
					</div>
					<div className={styles.courseAuthors}>
						<div className={styles.title}>
							<span className={styles.text}>Course authors</span>
						</div>
						{courseAuthorsList.length < 1 ? (
							<p className={styles.empty}>Please, add at least one author.</p>
						) : (
							<TransitionGroup component='ul'>
								{courseAuthorsList}
							</TransitionGroup>
						)}
					</div>
				</div>
			</div>
			{modal.isVisible === true && (
				<Modal onClose={() => dispatch(closeModalAction())}>
					<AddNewAuthor authors={authors} />
				</Modal>
			)}
		</>
	);
};
export default CourseForm;
