import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewProductForm.module.css";
import UploadAndDisplayImage from "./ui/UploadAndDisplayImage ";

export const NewProductForm = (props) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState(
    props.updateForm ? props.product.title : ""
  );
  const [imgUrl, setImgUrl] = useState(
    props.updateForm ? props.product.imageUrl : ""
  );
  const [price, setPrice] = useState(
    props.updateForm ? props.product.price : ""
  );
  let image = "";
  let imageUrl = "";
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();

  // if (props.updateForm) {
  //   setImgUrl(props.product.imageUrl);
  //   setPrice(props.product.price);
  //   setTitle(props.product.title);
  // }

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
    navigate("/");
  };

  function setMethode(event) {
    setSelectedOption(event.target.value);
  }

  function imageHandler(imageBase) {
    imageUrl = imageBase;
  }

  if (selectedOption === "URL" || props.updateForm) {
    image = (
      <div className={classes.control}>
        <label htmlFor="image" className={classes.label}>
          Product Image
        </label>
        <input
          type="url"
          required
          id="image"
          defaultValue={props.updateForm ? props.product.imageUrl : ""}
          ref={imageInputRef}
          onChange={(e) => setImgUrl(e.target.value)}
        ></input>
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
          <input
            type="text"
            required
            id="title"
            ref={titleInputRef}
            defaultValue={props.updateForm ? props.product.title : ""}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
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
                checked={props.updateForm}
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
          <input
            type="text"
            required
            id="price"
            ref={priceInputRef}
            defaultValue={props.updateForm ? props.product.price : ""}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>

        <div className={classes.actions}>
          <button>{props.updateForm ? "Upload changes" : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
};
