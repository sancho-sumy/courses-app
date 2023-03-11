import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { SEARCH_BTN_TEXT } from '../../../../constants';

import styles from './SearchBar.module.css';

function SearchBar({ onSubmit }) {
	return (
		<div className={styles.container}>
			<Input
				placeholderText='Enter course name...'
				name='search'
				id='search'
				onSubmit={onSubmit}
			/>
			<Button buttonText={SEARCH_BTN_TEXT} />
		</div>
	);
}
export default SearchBar;
