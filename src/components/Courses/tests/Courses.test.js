import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router';
import {
	ADD_NEW_COURSE_BTN_TEXT,
	CREATE_COURSE_BTN_TEXT,
	SHOW_COURSE_BTN_TEXT,
} from '../../../constants';

import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: 'test@test.com',
		role: 'admin',
	},
	courses: [
		{
			id: '1',
			title: 'Course 1',
			description: 'Description 1',
			authors: ['author1', 'author2'],
			duration: 90,
			creationDate: '05/03/2022',
		},
		{
			id: '2',
			title: 'Course 2',
			description: 'Description 2',
			authors: ['author1'],
			duration: 120,
			creationDate: '15/12/2023',
		},
	],
	authors: [
		{ id: '1', name: 'Author 1' },
		{ id: '2', name: 'Author 2' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

const router = createMemoryRouter(
	[
		{
			path: '/',
			children: [
				{ index: 'true' },
				{
					path: 'courses',
					children: [
						{ index: true, element: <Courses /> },
						{
							path: 'add',
							children: [{ index: true, element: <CourseForm /> }],
						},
					],
				},
			],
		},
	],
	{
		initialEntries: ['/courses'],
	}
);

describe('Courses component', () => {
	beforeEach(async () => {
		useSelector.mockImplementation((callback) => {
			return callback(mockedState);
		});

		await render(
			<Provider store={mockedStore}>
				<RouterProvider router={router} />
			</Provider>
		);
	});

	afterEach(() => {
		useSelector.mockClear();
	});

	test('should display amount of CourseCard equal length of courses array', async () => {
		const coursesArrayLength = mockedState.courses.length;
		const courseCards = await screen.findAllByText(SHOW_COURSE_BTN_TEXT);
		expect(courseCards).toHaveLength(coursesArrayLength);
	});

	test('should display Empty container if courses array length is 0', async () => {
		const localState = {
			...mockedState,
			courses: [],
		};

		useSelector.mockImplementation((callback) => {
			return callback(localState);
		});

		await render(
			<Provider store={mockedStore}>
				<RouterProvider router={router} />
			</Provider>
		);

		const emptyContainer = await screen.findByText(
			/There is no any courses.../i
		);
		expect(emptyContainer).toBeInTheDocument();
	});

	test('CourseForm should be showed after a click on a button "Add new course"', async () => {
		fireEvent.click(screen.getByText(ADD_NEW_COURSE_BTN_TEXT));

		await waitFor(() => {
			const courseForm = screen.getByText(CREATE_COURSE_BTN_TEXT);
			expect(courseForm).toBeInTheDocument();
		});
	});
});
