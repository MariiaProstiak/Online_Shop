import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  return (
    <div>
      <Backdrop onClick={props.onClose} />
      <div className={classes.modal}>
        <h2>{props.headerText}</h2>
        <p>{props.mainText}</p>
        <div className={classes.modal__actions}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
