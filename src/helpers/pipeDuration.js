export default function pipeDuration(duration) {
	return Math.floor(duration / 60) + ':' + ('00' + (duration % 60)).slice(-2);
}
