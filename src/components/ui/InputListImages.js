import classes from "./InputListImages.module.css";

const InputListImages = (props) => {
  return (
    <div className={classes.imagesList}>
      {props.images.map((item, index) => {
        return (
          <div className={classes.imageItem} key={index}>
            <img src={item} alt="img"></img>
            <button
              type="button"
              className={classes.deleteButton}
              onClick={(event) => {
                event.preventDefault();
                props.onDeleteImage(item);
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default InputListImages;
