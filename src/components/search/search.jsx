import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../search/search.css";
import ShopProductList from "../shoppages/shopProductList/shopProductList";
import shopCartContext from "../../context/shopcartContext";

export default function Search({ productsInfo }) {
  const { productDisplayList, setProductDispalyList, setShowMoreItem } =
    useContext(shopCartContext);

  const params = useParams();
  let searchid = params.searchid;
  let matchsearch = `^${searchid}`;
  let reg = new RegExp(matchsearch, "i");

  const compareCardTitleResult = productsInfo?.filter((eachcard) => {
    if (reg.test(eachcard.title.replace(/\s/g, "")) === true) {
      return eachcard;
    }
  });

  // const [currentDisplayCard, setCurrentDisplayCard] = useState(
  //   compareCardTitleResult
  // );
  useEffect(() => {
    setProductDispalyList(compareCardTitleResult);
    setShowMoreItem(true);
  }, [searchid]);
  return (
    <div className="searchTitle">
      {compareCardTitleResult?.length > 0 ? (
        <>
          <div className="searchinfo">
            Found {compareCardTitleResult?.length} product with keyword
            {searchid}
          </div>

          <ShopProductList />
        </>
      ) : (
        <div className="noproductfound">No product found.</div>
      )}
    </div>
  );
}
