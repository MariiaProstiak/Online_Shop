import { useState, useRef } from "react";
import classes from "./NewProductForm.module.css";
import UploadAndDisplayImage from "./ui/UploadAndDisplayImage ";

export const NewProductForm = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  let image = "";
  let imageUrl = "";
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageUrl ? imageUrl : imageInputRef.current.value;
    const enteredAddress = priceInputRef.current.value;

    const productData = {
      title: enteredTitle,
      imageUrl: enteredImage,
      price: enteredAddress,
      favorite: false,
    };
    props.onAddProduct(productData);
    console.log(productData);
  };

  function setMethode(event) {
    setSelectedOption(event.target.value);
  }

  function imageHandler(imageBase) {
    imageUrl = imageBase;
  }

  if (selectedOption === "URL") {
    image = (
      <div className={classes.control}>
        <label htmlFor="image" className={classes.label}>
          Product Image
        </label>
        <input type="url" required id="image" ref={imageInputRef}></input>
      </div>
    );
  } else if (selectedOption === "Upload") {
    image = (
      <div className={classes.control}>
        <label htmlFor="image" className={classes.label}>
          Product Image
        </label>
        <UploadAndDisplayImage onImageSelected={imageHandler} />
      </div>
    );
  }
  return (
    <div className={classes.NewProduct}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title" className={classes.label}>
            Product title
          </label>
          <input type="text" required id="title" ref={titleInputRef}></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="radio" className={classes.label}>
            Add Product Image by
          </label>
          <div onChange={setMethode} className={classes.radio} id="radio">
            <label htmlFor="url" className={classes.lradio}>
              <input
                type="radio"
                value="URL"
                name="methode"
                id="url"
                required
                className={classes.selector}
              />
              <span>URL</span>
            </label>
            <label htmlFor="update" className={classes.lradio}>
              <input
                type="radio"
                value="Upload"
                name="methode"
                id="update"
                className={classes.selector}
              />
              <span>Upload</span>
            </label>
          </div>
        </div>
        {image && image}
        <div className={classes.control}>
          <label htmlFor="price" className={classes.label}>
            Product price
          </label>
          <input type="text" required id="price" ref={priceInputRef}></input>
        </div>

        <div className={classes.actions}>
          <button>Add Product</button>
        </div>
      </form>
    </div>
  );
};
