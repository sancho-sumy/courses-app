import ReactDOM from 'react-dom';

import { Button } from '../Button';
import { CLOSE_BTN_ICON } from '../../constants';

import styles from './Modal.module.css';

const Backdrop = ({ onClose }) => {
	return <div className={styles.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children, onClose }) => {
	return (
		<div className={styles.modal}>
			<div className={styles.close}>
				<Button
					buttonText={CLOSE_BTN_ICON}
					size='small'
					design='secondary'
					onClick={onClose}
				/>
			</div>
			{children}
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onClose }) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};
export default Modal;
