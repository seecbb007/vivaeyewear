import React, { useEffect, useRef, useContext, useState } from "react";
import MainContext from "./context";
import "../shoppingcart/shoppingcart.css";
import shopCartContext from "../../context/shopcartContext";
import ShoppingcartCard from "./shoppingcartCard";
import { Link, Outlet, useNavigate } from "react-router-dom";
import signContext from "../../context/signContext";
import { useSelector, useDispatch } from "react-redux";
import { setLoginData, setUserInfoData } from "../../actions/loginActions";
import { setCurrentShoppingCartList } from "../../actions/shoppingCartAction";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Shoppingcart({ handleShoppingCartClick }) {
  //get data from redux reducer
  const dispatch = useDispatch();
  // const ifLogedin = useSelector((state) => {
  //   // console.log("shoppingcart", state?.loginReducer);
  //   return state?.loginReducer?.ifLogedin;
  // });
  const ifLogedin = localStorage.getItem("token");
  const shoppingCartData = useSelector((state) => {
    return state?.shoppingCartReducer?.shoppingCartList;
  });
  // console.log("111shoppingCartData", shoppingCartData);

  const [totalprice, setTotalPrice] = useState([]);
  const ref = useRef(null);
  const { cartStatus, setCartStatus } = useContext(MainContext);
  const { shoppingCartList, setShoppingCartList } = useContext(shopCartContext);
  const { signupInfo, setSignupInfo, ifsigned, setIfsigned } =
    useContext(signContext);

  const navigate = useNavigate();
  const itemInCart = shoppingCartData;

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

  const subtotalPriceList = itemInCart?.map((eachitem) => {
    return eachitem.price * eachitem.quantity;
  });

  const initial_subtotalPrice = 0;
  const subtotalPrice = subtotalPriceList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initial_subtotalPrice
  );
  // Clear Basket Button
  const handleClearBasket = () => {
    axios
      .post("http://127.0.0.1:8080/api/v1/shopproductCardDeleteAll")
      .then((res) => {
        console.log("Empty shopping cart", res.data);
        axios
          .get("http://127.0.0.1:8080/api/v1/shop")
          .then((res) => {
            console.log("Empty whole list", res.data.data);
            dispatch(setCurrentShoppingCartList(res.data.data));
          })
          .catch((error) => {
            console.log("faile to empty", error);
          });
      })
      .catch((error) => {
        console.log("Failed to empty shopping cart", error);
      });
    // setShoppingCartList([]);
  };
  // check out Button
  const handleCheckOut = () => {
    if (
      subtotalPrice > 0 &&
      ifLogedin?.length > 0

      // === true
    ) {
      navigate(`/checkout/step1`);
      setCartStatus(false);
    }
  };
  //MUI show backdrop
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  //get redux data

  // const iflogedin = useSelector((state) => {
  //   return state?.ifLogedin;
  // });
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
            {itemInCart?.map((eachItem, index) => {
              return <ShoppingcartCard eachItem={eachItem} key={eachItem.id} />;
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
            <div></div>
            {ifLogedin?.length > 0 ? (
              // === true
              <div
                className="sc_bottom_checkout"
                onClick={() => handleCheckOut()}
              >
                CHECK OUT
              </div>
            ) : (
              <div
                className="sc_bottom_checkout"
                onClick={() => handleCheckOut()}
              >
                <Button onClick={handleOpen} sx={{ color: "#fff" }}>
                  CHECK OUT
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <div className="pooperwindow">
                    <div className="pooperwindow_title">
                      You must sign in to continue checking out
                    </div>
                    <div className="buttongroup">
                      <Link to="/">
                        <button className="popper_butts">
                          Continue Shopping
                        </button>
                      </Link>
                      <Link to="/signin">
                        <button
                          className="popper_butts"
                          style={{
                            color: "white",
                            backgroundColor: "#101010",
                            border: " 1px solid #101010",
                          }}
                        >
                          Sign In to Check Out
                        </button>
                      </Link>
                    </div>
                  </div>
                  {/* <CircularProgress color="inherit" /> */}
                </Backdrop>
              </div>
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
