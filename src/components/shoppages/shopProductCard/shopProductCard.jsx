import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../shopProductCard/shopproductcard.css";
import shopCartContext from "../../../context/shopcartContext";

export default function ShopProductCard({
  img,
  title,
  subtitle,
  price,
  id,
  addedInCart,
  quantity,
  setCard18,
  card18,
}) {
  //shopcart context data
  // const { card18, setCard18 } = useContext(shopCartContext);

  // get selected Color=
  const [selectedColor, setSelectedColor] = useState("neutral");
  //get selected frame size
  const [selectedFrameSize, setSelectedFrameSize] = useState("36 mm");

  // const [checkCartStatus, setCheckCartStatus] = useState(addedInCart);
  // Add product to cart

  const handleAddToBasket = () => {
    const newList = card18.map((eachcard) => {
      // console.log("In SHOP", "Each card.id", eachcard.id);
      // console.log("In SHOP", "id", id);
      if (eachcard.id === id) {
        console.log("-----------------------------");
        return {
          ...eachcard,
          quantity: eachcard.quantity + 1,
          addedInCart: true,
          selectedColor: "neutral",
          selectedFrameSize: "28 mm",
        };
      }
      return eachcard;
    });
    setCard18(newList);
  };

  // Remove product from cart
  const handleRemovefromBasket = () => {
    const newList = card18.map((eachcard) => {
      if (eachcard.id === id) {
        return {
          ...eachcard,
          quantity: 0,
          addedInCart: false,
        };
      }
      return eachcard;
    });
    setCard18(newList);
    // setCheckCartStatus(false);
    // let newfilterlist = itemInCart.filter((eachitem) => {
    //   // Return 返回与点中，id不一样的卡片
    //   return Number(eachitem.id) !== Number(id);
    // });
  };

  // itemInCart.filter((eachProduct) => {
  //   return eachProduct.id === id;
  // }) === 0;
  // To check if glassess added to the basket
  // const checkBasketStatus =
  //   itemInCart.filter((eachitem) => {
  //     if (eachitem.id === id) {
  //       return eachitem;
  //     }
  //   })?.length === 0;

  //Remove item from shopping cart
  // const handlerRemovefromCart = (id) => {
  //   let removedCurrentlist = itemInCart.filter((eachitem) => {
  //     if (eachitem.id !== id) {
  //       return eachitem;
  //     }
  //   });
  //   // setItemInCart(removedCurrentlist);
  // };
  return (
    <div className="smallProduct">
      <div className="smallProduct_info">
        <Link to={`/productdetail/${id}`} style={{ textDecoration: "none" }}>
          <div className="container_img">
            <img src={img} alt="eyeglasses" className="gimg" />
          </div>
          <div className="product_naming">
            <div className="product_name">{title}</div>
            <div className="product_nickname">{subtitle}</div>
            <div className="smallproduct_price">${price}.00</div>
          </div>
        </Link>
        {quantity > 0 ? (
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
  );
}
