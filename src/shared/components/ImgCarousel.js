import React, { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";

const ImgCarousel = (props) => {
  return (
    <Fragment>
      <Carousel>
        {props.image.map((img) => {
          return (
            <Carousel.Item>
              <img className="d-block w-100" src={img} alt="items images" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Fragment>
  );
};

export default ImgCarousel;
