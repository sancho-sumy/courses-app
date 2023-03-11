import classes from './Button.module.css';

function Button({ type = 'button', buttonText, onClick }) {
	return (
		<button className={classes.btn} type={type} onClick={onClick}>
			{buttonText}
		</button>
	);
}
export default Button;
