import React, { useState } from "react";
import Hero from "../components/hero/hero";
import Products from "../components/products/products";
import Footer from "../components/footer/footer";
// all images
import img_biscut from "../assest/biscut.jpg";
import img_blue from "../assest/blue.jpg";
import img_brown from "../assest/brown.jpg";
import img_golden from "../assest/golden.jpg";
import img_red from "../assest/red.jpg";
import img_sbrown from "../assest/sbrown.jpg";
import img_green from "../assest/green.jpg";

export default function Home({ productsInfo }) {
  //FeaturedProduct 页面上的数据
  const FeaturedProduct = productsInfo.filter((eachitem) => {
    return eachitem.featured === true;
  });

  //RecommendedProduct 页面上的数据
  const RecommendedProduct = productsInfo.filter((eachitem) => {
    return eachitem.recommended === true;
  });
  return (
    <div>
      <Hero whichPage="home" />
      {/* 函数传参：Featured页面的title文字和App.js 19行定义的FeaturedProduct数据 */}
      <Products
        productTitle="Featured Products"
        productsInfo={FeaturedProduct}
        whichPage="home"
        whichpath="featured"
      />
      {/* 函数传参：Recommended 页面的title文字和App.js 28行定义的RecommendedProduct数据 */}
      <Products
        productTitle="Recommended Products"
        productsInfo={RecommendedProduct}
        whichPage="home"
        whichpath="recommended"
      />
      <Footer />
      {/* 函数传参, 传参：selectedCard里面符合要求的卡片，传参：updateDataLength函数， ShopProductsList页面可以使用updateDataLength函数*/}
    </div>
  );
}
