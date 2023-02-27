import classes from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageSlider = (props) => {
  return (
    <Carousel
      showArrows={true}
      // onChange={onChange}
      // onClickItem={onClickItem}
      // onClickThumb={onClickThumb}
    >
      {props.images.map((image, index) => {
        return (
          <div
            key={index}
            style={{
              width: "400px",
              height: "auto",
            }}
          >
            <img
              src={image}
              alt={`Image_${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/*{image.name !== undefined &&
              {
                <p className={classes.legend}>{image.name}</p> 
              }}*/}
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
