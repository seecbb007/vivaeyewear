import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./shopproductcard.css";
import shopCartContext from "../../../context/shopcartContext";

export default function ShopProductCard({
  img,
  title,
  subtitle,
  price,
  id,
  addedInCart,
  quantity,
  colors,
  framesize,
}) {
  //shopcart context data
  const { shoppingCartList, setShoppingCartList } = useContext(shopCartContext);

  // get selected Color=
  const [selectedColor, setSelectedColor] = useState("neutral");
  //get selected frame size
  const [selectedFrameSize, setSelectedFrameSize] = useState("36 mm");

  const handleAddToBasket = () => {
    setShoppingCartList([
      ...shoppingCartList,
      {
        img,
        title,
        subtitle,
        price,
        id,
        addedInCart,
        colors,
        framesize,
        quantity: quantity + 1,
      },
    ]);
  };

  const handleRemovefromBasket = () => {
    const newList = shoppingCartList.filter((eachProduct) => {
      return eachProduct.id !== id;
    });
    setShoppingCartList(newList);
  };

  const ifItemInCart =
    shoppingCartList.filter((eachItem) => {
      return eachItem.id === id;
    }).length === 1;

  return (
    <>
      {ifItemInCart ? (
        <div
          className="smallProduct"
          style={{ border: "1px solid rgb(166, 165, 165)" }}
        >
          <svg
            className="checkmark"
            t="1690866180131"
            viewBox="0 0 1027 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2259"
            width="15"
            height="15"
          >
            <path
              d="M380.64 755.386L950.847 185.18c17.573-17.573 46.066-17.573 63.64 0 17.573 17.574 17.573 46.066 0 63.64l-582.59 582.59c-28.308 28.308-74.205 28.308-102.512 0L9.18 511.205c-17.573-17.573-17.573-46.066 0-63.64 17.574-17.573 46.066-17.573 63.64 0l307.82 307.821z"
              p-id="2260"
              fill="#3B9620"
            ></path>
          </svg>

          <div className="smallProduct_info">
            <Link
              to={`/productdetail/${id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="container_img">
                <img src={img} alt="eyeglasses" className="gimg" />
              </div>
              <div className="product_naming">
                <div className="product_name">{title}</div>
                <div className="product_nickname">{subtitle}</div>
                <div className="smallproduct_price">${price}.00</div>
              </div>
            </Link>
            {ifItemInCart ? (
              <div
                className="addBasket_butt buttonremove"
                onClick={() => {
                  handleRemovefromBasket();
                }}
              >
                Remove From basket
              </div>
            ) : (
              <div
                className="addBasket_butt"
                onClick={() => {
                  handleAddToBasket();
                }}
              >
                Add to basket
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="smallProduct">
          <div className="smallProduct_info">
            <Link
              to={`/productdetail/${id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="container_img">
                <img src={img} alt="eyeglasses" className="gimg" />
              </div>
              <div className="product_naming">
                <div className="product_name">{title}</div>
                <div className="product_nickname">{subtitle}</div>
                <div className="smallproduct_price">${price}.00</div>
              </div>
            </Link>
            {ifItemInCart ? (
              <div
                className="addBasket_butt buttonremove"
                onClick={() => {
                  handleRemovefromBasket();
                }}
              >
                Remove From basket
              </div>
            ) : (
              <div
                className="addBasket_butt"
                onClick={() => {
                  handleAddToBasket();
                }}
              >
                Add to basket
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
