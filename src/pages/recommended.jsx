import React, { useState } from "react";

import Products from "../components/products/products";
import Hero from "../components/hero/hero";
// all images
import img_biscut from "../assest/biscut.jpg";
import img_blue from "../assest/blue.jpg";
import img_brown from "../assest/brown.jpg";
import img_golden from "../assest/golden.jpg";
import img_red from "../assest/red.jpg";
import img_sbrown from "../assest/sbrown.jpg";
import img_green from "../assest/green.jpg";
import banner_gril1 from "../assest/banner-girl-1.png";

export default function Recommended({ productsInfo }) {
  const RecommendedProduct = productsInfo.filter((eachitem) => {
    return eachitem.recommended === true;
  });
  return (
    <div>
      {/* 函数传参：Featured页面的title文字和App.js 19行定义的FeaturedProduct数据 */}
      <Hero
        whichPage="recommended"
        herotitle="Recommended Products"
        heroimg={banner_gril1}
      />
      <Products
        productTitle="Recommended Products"
        productsInfo={RecommendedProduct}
        whichPage="recommended"
      />
    </div>
  );
}
