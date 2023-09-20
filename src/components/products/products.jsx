import React, { useState, useEffect } from "react";

import "./products.css";
import ProductCard from "../productCard/productCard";
import { Link } from "react-router-dom";

import renderGlassImg from "../../utils/renderGlassImg";

export default function Products({
  productTitle,
  productsInfo,
  whichPage,
  whichpath,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [whichpath]);

  return (
    <div className="productsContainer">
      <div className="Products">
        <div className="p_titleContainer">
          <div className="p_title">{productTitle}</div>
          {whichPage === "home" ? (
            <Link to={`/${whichpath}`}>
              <div className="seeall">See All</div>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="p_productDisplay">
          {productsInfo?.map((eachinfo) => {
            return (
              <Link
                to={`/productdetail/${eachinfo.itemNumber}`}
                style={{ textDecoration: "none" }}
                key={eachinfo.itemNumber}
              >
                <ProductCard
                  img={eachinfo.img}
                  title={eachinfo.title}
                  subtitle={eachinfo.subtitle}
                />
                {/* {renderGlassImg(eachinfo)} */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
