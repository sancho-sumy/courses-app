import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CourseCard } from '../CourseCard';

describe('CourseCard', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
			email: 'test@test.com',
			role: 'admin',
		},
		courses: [],
		authors: [],
	};

	const mockedCourse = {
		id: '1111',
		title: 'Test Title',
		description: `Test Description`,
		creationDate: '01/01/2000',
		duration: '00:15',
		authors: 'Author1, Author2',
	};

	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	const getAuthorsList = jest.fn();
	const pipeDuration = jest.fn();

	beforeEach(() => {
		getAuthorsList.mockReturnValue(mockedCourse.authors);
		pipeDuration.mockReturnValueOnce(mockedCourse.duration);

		render(
			<Provider store={mockedStore}>
				<CourseCard
					id={mockedCourse.id}
					title={mockedCourse.title}
					description={mockedCourse.description}
					authors={getAuthorsList()}
					duration={pipeDuration() + ' hours'}
					creationDate={mockedCourse.creationDate}
					key={mockedCourse.id}
				/>
			</Provider>,
			{ wrapper: BrowserRouter }
		);
	});

	test('should display title', () => {
		const title = screen.queryByText('Test Title');
		expect(title).toBeInTheDocument();
	});

	test('should display description', () => {
		const description = screen.queryByText('Test Description');
		expect(description).toBeInTheDocument();
	});

	test('should display duration in the correct format', () => {
		const duration = screen.queryByText(mockedCourse.duration + ' hours');
		expect(duration).toBeInTheDocument();
	});

	test('should display authors list', () => {
		const authors = screen.queryByText(mockedCourse.authors);
		expect(authors).toBeInTheDocument();
	});

	test('should display created date in the correct format', () => {
		const creationDate = screen.queryByText(mockedCourse.creationDate);
		expect(creationDate).toBeInTheDocument();
	});
});
