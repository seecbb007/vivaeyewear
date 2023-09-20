import React from "react";
import "./productCard.css";

import renderGlassImg from "../../utils/renderGlassImg";

export default function ProductCard({ img, title, subtitle }) {
  return (
    <div className="productcard">
      <div className="pc_container_img">
        <img src={renderGlassImg(img)} alt="eyeglasses" className="pc_gimg" />
      </div>
      <div className="pc_product_naming">
        <div className="pc_product_name">{title}</div>
        <div className="pc_product_nickname">{subtitle}</div>
      </div>
    </div>
  );
}
