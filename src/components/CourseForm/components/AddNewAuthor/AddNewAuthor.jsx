import { useState } from 'react';
import { addNewAuthor } from '../../../../store/authors/thunk';
import { setAlertAction } from '../../../../store/alert/actionCreators';
import { useDispatch } from 'react-redux';

import { Button, Input } from '../../../../common';
import {
	CREATE_AUTHOR_BTN_TEXT,
	LOADING_BTN_SPINNER,
} from '../../../../constants';

import styles from './AddNewAuthor.module.css';

const AddNewAuthor = ({ authors }) => {
	const [newAuthorName, setNewAuthorName] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const newAuthorSubmitHandler = async (e) => {
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
		setIsLoading(true);
		const newAuthor = {
			name: newAuthorName,
		};

		const response = await dispatch(addNewAuthor(newAuthor));

		if (response) {
			setNewAuthorName('');
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={newAuthorSubmitHandler} className={styles.addNewAuthor}>
			<h3>Add new author</h3>
			<Input
				id='author-name'
				placeholderText={'Enter author name'}
				onChange={(e) => setNewAuthorName(e.target.value)}
				value={newAuthorName}
			/>
			<Button
				buttonText={!isLoading ? CREATE_AUTHOR_BTN_TEXT : LOADING_BTN_SPINNER}
				type='submit'
				isDisabled={isLoading}
			/>
		</form>
	);
};

export default AddNewAuthor;
