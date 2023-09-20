import React from "react";

import img_biscut from "../assest/biscut.jpg";
import img_blue from "../assest/blue.jpg";
import img_brown from "../assest/brown.jpg";
import img_golden from "../assest/golden.jpg";
import img_red from "../assest/red.jpg";
import img_sbrown from "../assest/sbrown.jpg";
import img_green from "../assest/green.jpg";

const renderGlassImg = (img) => {
  if (img === "img_biscut") {
    return img_biscut;
  }
  if (img === "img_blue") {
    return img_blue;
  }
  if (img === "img_brown") {
    return img_brown;
  }
  if (img === "img_golden") {
    return img_golden;
  }
  if (img === "img_red") {
    return img_red;
  }
  if (img === "img_sbrown") {
    return img_sbrown;
  }
  if (img === "img_green") {
    return img_green;
  }
};

export default renderGlassImg;
