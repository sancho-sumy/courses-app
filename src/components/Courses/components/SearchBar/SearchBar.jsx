import { Form, useNavigation } from 'react-router-dom';
import { Button, Input } from '../../../../common';
import { SEARCH_BTN_TEXT, LOADING_BTN_SPINNER } from '../../../../constants';

import styles from './SearchBar.module.css';

export const SearchBar = ({ onSubmit, onChange }) => {
	const navigation = useNavigation();

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q');

	return (
		<Form id='search-form' className={styles.container}>
			<Input
				placeholderText='Enter course name...'
				name='q'
				id='search'
				onChange={onChange}
			/>
			<Button
				buttonText={!searching ? SEARCH_BTN_TEXT : LOADING_BTN_SPINNER}
				type={'submit'}
				design='secondary'
				isDisabled={searching}
			/>
		</Form>
	);
};
