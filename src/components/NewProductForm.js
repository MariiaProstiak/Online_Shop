import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewProductForm.module.css";
import UploadAndDisplayImage from "./ui/UploadAndDisplayImage ";

export const NewProductForm = (props) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPreview, setShowPreview] = useState(
    props.updateForm ? true : false
  );
  const [title, setTitle] = useState(
    props.updateForm ? props.product.title : ""
  );
  const [imgUrl, setImgUrl] = useState(
    props.updateForm ? props.product.imageUrl : ""
  );
  const [price, setPrice] = useState(
    props.updateForm ? props.product.price : ""
  );

  const [details, setDetails] = useState(
    props.updateForm ? props.product.details : ""
  );
  let image = "";
  let imageUrl = "";
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const detailsInputRef = useRef();

  // if (props.updateForm) {
  //   setImgUrl(props.product.imageUrl);
  //   setPrice(props.product.price);
  //   setTitle(props.product.title);
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageUrl ? imageUrl : imageInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDetails = detailsInputRef.current.value;

    const productData = {
      title: enteredTitle,
      imageUrl: enteredImage,
      price: enteredPrice,
      details: enteredDetails,
      favorite: false,
    };
    props.onAddProduct(productData);
    navigate("/");
  };

  function setMethode(event) {
    setSelectedOption(event.target.value);
    setShowPreview(false);
  }

  function imageHandler(imageBase) {
    imageUrl = imageBase;
  }

  function onChangeImageText(e) {
    setImgUrl(e.target.value);
    if (e.target.value !== "") {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
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
          onChange={onChangeImageText}
        ></input>
        {showPreview && (
          <img
            src={imgUrl}
            alt="img"
            style={{ width: "70px", height: "70px" }}
          ></img>
        )}
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
                defaultChecked={props.updateForm}
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

        <div className={classes.control}>
          <label htmlFor="details" className={classes.label}>
            Details
          </label>
          <textarea
            required
            id="details"
            rows="5"
            ref={detailsInputRef}
            defaultValue={props.updateForm ? props.product.details : ""}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>{props.updateForm ? "Upload changes" : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
};
