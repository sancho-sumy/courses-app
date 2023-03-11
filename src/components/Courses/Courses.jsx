import CourseCard from './components/CourseCard/CourseCard';

import styles from './Courses.module.css';

import { getAuthors, pipeDuration } from '../../helpers';

import { ADD_NEW_COURSE_BTN_TEXT, mockedCoursesList } from '../../constants';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

function Courses({ setAddCourse }) {
	const searchHandler = () => {
		console.log('Searching...');
	};

	const coursesList = mockedCoursesList.map((course) => {
		return (
			<CourseCard
				title={course.title}
				description={course.description}
				authors={getAuthors(course.authors)}
				duration={pipeDuration(course.duration) + ' hours'}
				creationDate={course.creationDate}
				key={course.id}
			/>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SearchBar onSubmit={searchHandler} />
				<Button
					buttonText={ADD_NEW_COURSE_BTN_TEXT}
					onClick={() => setAddCourse(true)}
				/>
			</div>
			{coursesList}
		</div>
	);
}

export default Courses;
