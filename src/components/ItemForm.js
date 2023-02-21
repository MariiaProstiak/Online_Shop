import classes from "./ItemForm.module.css";
import Input from "./ui/Input";
import { useRef, useState } from "react";

const ItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: "1",
          step: "1",
          defaultValue: props.amount ? props.amount : "1",
        }}
      />
      <button>
        <img className={classes.plus} src="/img/btn-plus.svg" alt="Plus" />
      </button>

      {!amountIsValid && <p>Please enter a valid amount (more than 0)</p>}
    </form>
  );
};

export default ItemForm;
