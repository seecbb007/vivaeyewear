import React from "react";
import "./featuredproducts.css";
import FeaturedProductCard from "../featuredcard/featuredproductCard";
import bannerguy from "../../../assest/banner-guy.png";
export default function FeaturedProducts({ productTitle, productsInfo }) {
  return (
    <div className="featuredProducts">
      <div className="fp_titleContainer">
        <div className="fp_title">{productTitle}</div>
        <div className="fp_imgContainer">
          <img src={bannerguy} alt="bannerguy" className="bannerguy" />
        </div>
      </div>
      <div className="productDisplay">
        {productsInfo.map((eachinfo, index) => {
          return (
            <FeaturedProductCard
              key={eachinfo.id}
              img={eachinfo.img}
              title={eachinfo.title}
              subtitle={eachinfo.subtitle}
            />
          );
        })}
      </div>
    </div>
  );
}
