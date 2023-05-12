export const getAuthorsList = (authorIds, authorList) => {
	return authorIds.map(
		(authorId) =>
			authorList?.find((author) => author.id === authorId)?.name || null
	);
};
