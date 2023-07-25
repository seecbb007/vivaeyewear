import React from "react";
import "../featuredcard/featuredproductCard.css";

export default function FeaturedProductCard({ img, title, subtitle }) {
  return (
    <div className="fp_product">
      <div className="fp_container_img">
        <img src={img} alt="eyeglasses" className="fp_gimg" />
      </div>
      <div className="fpproduct_naming">
        <div className="fpproduct_name">{title}</div>
        <div className="fpproduct_nickname">{subtitle}</div>
      </div>
    </div>
  );
}
