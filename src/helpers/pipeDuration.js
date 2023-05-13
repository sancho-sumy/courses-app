export const pipeDuration = (totalMinutes) => {
	if (totalMinutes < 0) {
		return '00:00';
	}
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);

	return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

const padTo2Digits = (num) => {
	return num.toString().padStart(2, '0');
};
