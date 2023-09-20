import React, { useContext, useEffect } from "react";
import "../shoppingcart/shoppingcartCard.css";
import Radio, { radioClasses } from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import shopCartContext from "../../context/shopcartContext";
import renderGlassImg from "../../utils/renderGlassImg";
import axios from "axios";
import { setCurrentShoppingCartList } from "../../actions/shoppingCartAction";
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingcartCard({ eachItem }) {
  const {
    framesize,
    title,
    quantity,
    size,
    colors,
    price,
    img,
    itemNumber,
    subtotalprice,
    selectedFrameSize,
    selectedColor,
  } = eachItem;

  const dispatch = useDispatch();
  const currentColor =
    selectedColor === undefined || selectedColor === ""
      ? colors[0]
      : selectedColor;
  const currentFrameSize =
    selectedFrameSize === undefined || selectedFrameSize === ""
      ? framesize[0]
      : selectedFrameSize;

  let totalPricing = quantity * price;
  const { shoppingCartList, setShoppingCartList } = useContext(shopCartContext);
  // const currentCard = useSelector((state) => {
  //   return state?.shoppingCartReducer?.shoppingCartList;
  // });

  // shopping cart CARD___ADD Quantity
  const handleAddQuantity = () => {
    // const newList = shoppingCartList?.map((eachcard) => {
    //   if (eachcard.itemNumber === itemNumber) {
    //     return {
    //       ...eachcard,
    //       quantity: quantity + 1,
    //     };
    //   }
    //   return eachcard;
    // });
    // setShoppingCartList(newList);
    const dataSet = { value: itemNumber };
    axios
      .post("http://127.0.0.1:8080/api/v1/shopproductCardUpdate", dataSet)
      .then((res) => {
        // console.log("iii", item);
        console.log("DETAIL:updateOne to shopping cart", res.data.data);

        // setShoppingCartList(res.data);
        axios
          .get("http://127.0.0.1:8080/api/v1/shop")
          .then((res) => {
            console.log(
              "add quantity:Get shoppingCartList data",
              res.data.data
            );
            dispatch(setCurrentShoppingCartList(res.data.data));
          })
          .catch((error) => {
            // console.log("get shop item fail", error);
          });
      })
      .catch((error) => {
        console.log("DETAIL:updateItem Failed", error);
      });
  };

  const handleRemoveQuantity = () => {
    // const newList = shoppingCartList?.map((eachcard) => {
    //   if (eachcard.itemNumber === itemNumber && quantity > 1) {
    //     return {
    //       ...eachcard,
    //       quantity: quantity - 1,
    //     };
    //   }
    //   return eachcard;
    // });
    // setShoppingCartList(newList);
    const dataSet = { itemNumber: itemNumber };
    axios
      .post(
        "http://127.0.0.1:8080/api/v1/shopproductCardUpdatedecrese",
        dataSet
      )
      .then((res) => {
        // console.log("iii", item);
        console.log("DECREASE:updateOne to shopping cart", res.data.data);
        axios
          .get("http://127.0.0.1:8080/api/v1/shop")
          .then((res) => {
            console.log(
              "remove quantity:Get shoppingCartList data",
              res.data.data
            );
            dispatch(setCurrentShoppingCartList(res.data.data));
          })
          .catch((error) => {
            // console.log("get shop item fail", error);
          });
      })
      .catch((error) => {
        console.log("DETAIL:updateItem Failed", error);
      });
  };

  // shopping cart CARD___DELETE
  const handleDelete = () => {
    // let newList = shoppingCartList.filter((eachItem) => {
    //   return eachItem.itemNumber !== itemNumber;
    // });
    // setShoppingCartList(newList);
    let itemNumbernum = { itemNumber };
    axios
      .post("http://127.0.0.1:8080/api/v1/shopproductCardDelete", itemNumbernum)
      .then((res) => {
        console.log("shopProductCardDelete", res.data);
        console.log("remove item", itemNumber);
        axios
          .get("http://127.0.0.1:8080/api/v1/shop")
          .then((res) => {
            console.log("Get shoppingCartList data", res.data.data);
            dispatch(setCurrentShoppingCartList(res.data.data));
          })
          .catch((error) => {
            console.log("ShoppingCartCARD: get shop item fail", error);
          });
      })
      .catch((error) => {
        console.log("ShoppingCartCARD: Fail to remove item", error);
      });
  };

  return (
    <div>
      <div className="BasketCard">
        <div className="BasketCard_Container">
          <div className="BasketCardInformation">
            <div className="plusminusButtons">
              <button
                id={itemNumber}
                className="pm_buttn plus"
                onClick={() => handleAddQuantity()}
              >
                +
              </button>
              <button
                id={itemNumber}
                className="pm_buttn minus"
                onClick={(e) => handleRemoveQuantity(e)}
              >
                -
              </button>
            </div>
            <div className="card_imgContainer">
              <img
                src={renderGlassImg(img)}
                alt="BasketCard_img"
                className="cardImg"
              />
            </div>
            <div className="card_allinfo">
              <div className="allinfo_title">{title}</div>
              <div className="allinfo_detailInformation">
                <div className="detailList">
                  <div className="detailList_text">Quantity</div>
                  <div className="detailList_content">{quantity}</div>
                </div>
                <div className="detailList">
                  <div className="detailList_text">Size</div>
                  <div className="detailList_content">{currentFrameSize}</div>
                </div>
                <div className="detailList">
                  <div className="detailList_text">Color</div>
                  <div className="detailList_content">
                    <Sheet
                      key={currentColor}
                      sx={{
                        position: "relative",
                        // top: "10px",
                        left: "5px",
                        width: 15,
                        height: 15,
                        flexShrink: 0,
                        bgcolor: `${currentColor}.solidBg`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Radio
                        overlay
                        variant="solid"
                        color={currentColor}
                        value={currentColor}
                        slotProps={{
                          input: { "aria-label": currentColor },
                          radio: {
                            sx: {
                              display: "contents",
                              "&, &.Mui-checked": {
                                color: "white",
                                fontSize: "25px",
                              },
                              "--variant-borderWidth": "2px",
                            },
                          },
                        }}
                        sx={{
                          "--joy-focus-outlineOffset": "4px",
                          "--joy-palette-focusVisible": (theme) =>
                            // theme.vars.palette[color][500],
                            theme.vars.palette[currentColor],
                          [`& .${radioClasses.action}.${radioClasses.focusVisible}`]:
                            {
                              outlineWidth: "2px",
                            },
                        }}
                      />
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
            <div className="cardPricing">${totalPricing}.00</div>
            <div
              className="deleteButton"
              id={itemNumber}
              onClick={(e) => handleDelete(e)}
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
