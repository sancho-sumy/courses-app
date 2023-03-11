import { mockedAuthorsList } from '../constants';

export default function getAuthors(listOfAuthorsIds) {
	return listOfAuthorsIds
		.map(
			(authorId) =>
				mockedAuthorsList.find((author) => author.id === authorId)?.name ||
				'N/A'
		)
		.join(', ');
}
