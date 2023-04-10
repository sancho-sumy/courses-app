import { Button, Input } from '../../../../common';
import { SEARCH_BTN_TEXT } from '../../../../constants';

import styles from './SearchBar.module.css';

export function SearchBar({ onSubmit, onChange }) {
	return (
		<form className={styles.container} onSubmit={onSubmit}>
			<Input
				placeholderText='Enter course name...'
				name='search'
				id='search'
				onChange={onChange}
			/>
			<Button buttonText={SEARCH_BTN_TEXT} type={'submit'} />
		</form>
	);
}
