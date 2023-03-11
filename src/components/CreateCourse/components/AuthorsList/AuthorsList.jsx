import { Button } from '../../../../common';
import { ADD_AUTHOR_BTN_TEXT } from '../../../../constants';

function AuthorsList() {
	return (
		<div>
			<li>
				<p>Vasiliy Dobkin</p>
				<Button buttonText={ADD_AUTHOR_BTN_TEXT} />
			</li>
		</div>
	);
}
export default AuthorsList;
