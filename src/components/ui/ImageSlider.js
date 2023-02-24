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
          <div key={index}>
            <img src={image.url} alt={`Image_${index}`} />
            {image.name !== undefined && (
              <p className={classes.legend}>{image.name}</p>
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
