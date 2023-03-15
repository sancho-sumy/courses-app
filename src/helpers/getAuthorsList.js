export default function getAuthors(authorsId, authorList) {
	return authorsId
		.map(
			(authorId) =>
				authorList?.find((author) => author.id === authorId)?.name || 'N/A'
		)
		.join(', ');
}
