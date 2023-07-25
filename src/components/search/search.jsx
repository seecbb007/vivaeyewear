import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import "../search/search.css";
import ShopProductList from "../shoppages/shopProductList/shopProductList";
import shopCartContext from "../../context/shopcartContext";

export default function Search({ productsInfo }) {
  const { card18, setCard18 } = useContext(shopCartContext);

  const params = useParams();
  let searchid = params.searchid;
  let matchsearch = `^${searchid}`;
  let reg = new RegExp(matchsearch, "i");

  const compareCardTitle = productsInfo.filter((eachcard) => {
    if (reg.test(eachcard.title.replace(/\s/g, "")) === true) {
      return eachcard;
    }
  });
  const [currentDisplayCard, setCurrentDisplayCard] =
    useState(compareCardTitle);

  return (
    <div className="searchTitle">
      {compareCardTitle?.length > 0 ? (
        <>
          <div className="searchinfo">
            Found {compareCardTitle?.length} product with keyword {searchid}
          </div>

          <ShopProductList
            selectedCard={compareCardTitle}
            setCard18={setCard18}
            card18={card18}
            currentDisplayCard={currentDisplayCard}
            setCurrentDisplayCard={setCurrentDisplayCard}
          />
        </>
      ) : (
        <div className="noproductfound">No product found.</div>
      )}
    </div>
  );
}
