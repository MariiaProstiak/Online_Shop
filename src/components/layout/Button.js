import classes from "./Button.module.css";

const Button = (props) => {
  const buttonStyles =
    props.type === "danger" ? classes.danger : classes.succsess;

  return (
    <button
      className={classes.button + " " + buttonStyles}
      type="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
