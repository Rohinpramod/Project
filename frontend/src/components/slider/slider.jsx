import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = ({data,settings,renderItem}) => {
  
  return (
    <div>
        <Slider {...settings}>
    {data.map((item)=> renderItem(item))}
  </Slider>
    </div>
    
  );
}

export default SimpleSlider;