import React from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const HomeCarousel = (props) => {
  return (
    <Carousel
      autoPlay={true}
      showThumbs={false}
      showArrows={false}
      infiniteLoop={true}
    >
      <div>
        <img
          src="http://www.binova.com.vn/Content/Binova/slideshow/binova_1.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          src="http://www.binova.com.vn/Content/Binova/slideshow/binova_2.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          src="http://www.binova.com.vn/Content/Binova/slideshow/binova_3.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          src="http://www.binova.com.vn/Content/Binova/slideshow/binova_4.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          src="http://www.binova.com.vn/Content/Binova/slideshow/binova_5.jpg"
          alt=""
        />
      </div>
    </Carousel>
  );
};
HomeCarousel.propTypes = {};

export default HomeCarousel;
