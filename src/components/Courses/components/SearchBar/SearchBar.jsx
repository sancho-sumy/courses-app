import { Form } from 'react-router-dom';
import { Button, Input } from '../../../../common';
import { SEARCH_BTN_TEXT } from '../../../../constants';

import styles from './SearchBar.module.css';

export function SearchBar({ onSubmit, onChange }) {
	return (
		<Form id='search-form' className={styles.container}>
			<Input
				placeholderText='Enter course name...'
				name='q'
				id='search'
				onChange={onChange}
			/>
			<Button buttonText={SEARCH_BTN_TEXT} type={'submit'} design='secondary' />
		</Form>
	);
}
