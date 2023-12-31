import React, { useContext, useEffect } from "react";
import "../shoppingcart/shoppingcartCard.css";
import Radio, { radioClasses } from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import shopCartContext from "../../context/shopcartContext";

export default function ShoppingcartCard({ eachItem }) {
  const {
    framesize,
    title,
    quantity,
    size,
    colors,
    price,
    img,
    id,
    subtotalprice,
    selectedFrameSize,
    selectedColor,
  } = eachItem;

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

  // shopping cart CARD___ADD Quantity
  const handleAddQuantity = () => {
    const newList = shoppingCartList.map((eachcard) => {
      if (eachcard.id === id) {
        return {
          ...eachcard,
          quantity: quantity + 1,
        };
      }
      return eachcard;
    });
    setShoppingCartList(newList);
  };

  const handleRemoveQuantity = () => {
    const newList = shoppingCartList.map((eachcard) => {
      if (eachcard.id === id && quantity > 1) {
        return {
          ...eachcard,
          quantity: quantity - 1,
        };
      }
      return eachcard;
    });
    setShoppingCartList(newList);
  };

  // shopping cart CARD___DELETE
  const handleDelete = () => {
    let newList = shoppingCartList.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setShoppingCartList(newList);
  };

  return (
    <div>
      <div className="BasketCard">
        <div className="BasketCard_Container">
          <div className="BasketCardInformation">
            <div className="plusminusButtons">
              <button
                id={id}
                className="pm_buttn plus"
                onClick={(e) => handleAddQuantity(e)}
              >
                +
              </button>
              <button
                id={id}
                className="pm_buttn minus"
                onClick={(e) => handleRemoveQuantity(e)}
              >
                -
              </button>
            </div>
            <div className="card_imgContainer">
              <img src={img} alt="BasketCard_img" className="cardImg" />
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
              id={id}
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
