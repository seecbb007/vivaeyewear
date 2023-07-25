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
import banner_guy from "../assest/banner-guy.png";

export default function Featured({ productsInfo }) {
  const FeaturedProduct = productsInfo.filter((eachitem) => {
    return eachitem.featured === true;
  });
  return (
    <div>
      {/* 函数传参：Featured页面的title文字和App.js 19行定义的FeaturedProduct数据 */}
      <Hero
        whichPage="featured"
        herotitle="Featured Products"
        heroimg={banner_guy}
      />
      <Products
        productTitle="Featured Products"
        productsInfo={FeaturedProduct}
      />
    </div>
  );
}
