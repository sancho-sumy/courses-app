export default function getAuthors(authorIds, authorList) {
	return authorIds
		.map(
			(authorId) =>
				authorList?.find((author) => author.id === authorId)?.name || 'N/A'
		)
		.join(', ');
}
