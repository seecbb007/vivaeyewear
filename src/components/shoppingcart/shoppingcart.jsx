import React, { useEffect, useRef, useContext, useState } from "react";
import MainContext from "./context";
import "../shoppingcart/shoppingcart.css";
import shopCartContext from "../../context/shopcartContext";
import ShoppingcartCard from "./shoppingcartCard";
export default function Shoppingcart({ handleShoppingCartClick }) {
  const [totalprice, setTotalPrice] = useState([]);
  const ref = useRef(null);
  const { cartStatus, setCartStatus } = useContext(MainContext);
  const { card18, setCard18 } = useContext(shopCartContext);

  const itemInCart = card18.filter((eachcard) => {
    return eachcard.addedInCart === true && eachcard.quantity > 0;
  });

  const cartClassName =
    cartStatus === true ? "shoppingCart" : "hidden shoppingCart";
  //   console.log("STATUS IN SHOPPING CART", cartStatus);
  //关闭开启购物车

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCartStatus(false);
    } else if (
      ref.current &&
      ref.current.contains(event.target) &&
      event.target.className === "top_twobuttons_butts_close"
    ) {
      setCartStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // Calculate subtotal price

  const subtotalPriceList = itemInCart.map((eachitem) => {
    return eachitem.price * eachitem.quantity;
  });

  const initial_subtotalPrice = 0;
  const subtotalPrice = subtotalPriceList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initial_subtotalPrice
  );
  // Clear Basket Button
  const handleClearBasket = () => {
    let newList = card18.map((eachcard) => {
      if (eachcard.addedInCart === true) {
        return {
          ...eachcard,
          quantity: 0,
          addedInCart: false,
        };
      }
      return eachcard;
    });
    setCard18(newList);
  };
  // check out Button
  const handleCheckOut = () => {};

  return (
    <div>
      <div className={cartClassName} ref={ref}>
        <div className="shoppingCart_Container">
          <div className="sc_top">
            <div className="sc_top_titleSection">
              <div className="top_titleSection_title">My Basket</div>
              <div className="top_titleSection_numItems">
                ({itemInCart?.length} items)
              </div>
            </div>
            <div className="sc_top_twobuttons">
              <div
                className="top_twobuttons_butts_close"
                onClick={() => setCartStatus(false)}
              >
                Close
              </div>
              <div
                className="top_twobuttons_butts"
                onClick={() => handleClearBasket()}
              >
                Clear Basket
              </div>
            </div>
          </div>
          <div className="sc_middle">
            {itemInCart.map((eachItem, index) => {
              return <ShoppingcartCard eachItem={eachItem} key={index} />;
            })}
          </div>
          <div className="sc_bottom">
            <div className="sc_bottom_subtotal">
              <div className="bottom_subtotal_title">Subtotal Amount:</div>
              <div className="bottom_subtotal_amount">
                ${subtotalPrice}
                .00
              </div>
            </div>
            <div
              className="sc_bottom_checkout"
              onClick={() => handleCheckOut()}
            >
              CHECK OUT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
