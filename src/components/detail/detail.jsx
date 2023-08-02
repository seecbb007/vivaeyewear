import React, { useContext, useEffect, useState } from "react";
import img_brown from "../../assest/brown.jpg";
import "../detail/detail.css";
// import { Theme, useTheme } from "@mui/material/styles";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Dropdownlist from "../shoppages/dropdownlist/dropdown";
import ColorList from "../shoppages/dropdownlist/colorlist";
import Products from "../products/products";
import { useParams, Link } from "react-router-dom";
import shopCartContext from "../../context/shopcartContext";

export default function Productdetail({ productsInfo }) {
  // state 里面存了shopcard18，
  const { card18, shoppingCartList, setShoppingCartList } =
    useContext(shopCartContext);
  // get selected Color
  const [selectedColor, setSelectedColor] = useState("");
  //get selected frame size
  const [selectedFrameSize, setSelectedFrameSize] = useState("");
  //If the id has changed, it will jump to the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useParams().id]);
  //如果在filter数据中，filter到recommended是true的就返回这个数据在一个新数组中。
  const RecommendedProduct = productsInfo.filter((eachitem) => {
    return eachitem.recommended === true;
  });

  //params传参，取id值
  const params = useParams();
  let paramsId = params.id;
  //如果参选中的每一个卡片id等于传参接到的那个id，就返回那个卡片。Filter出来会是一个
  //新数组，我需要拿到它的第一位，那就是【0】
  const currentParamsId_Card = card18?.filter((eachcard) => {
    if (eachcard.id === Number(paramsId)) {
      return eachcard;
    }
  })[0];

  const handleAddtoCart = () => {
    setShoppingCartList([
      ...shoppingCartList,
      {
        ...currentParamsId_Card,
        quantity: currentParamsId_Card.quantity + 1,
        addedInCart: true,
        selectedColor: selectedColor,
        selectedFrameSize: selectedFrameSize,
      },
    ]);
  };

  //Remove item from shopping cart
  const handlerRemovefromCart = () => {
    const newList = shoppingCartList.filter((eachItem) => {
      return eachItem.id !== currentParamsId_Card.id;
    });
    setShoppingCartList(newList);
  };
  // console.log("detail setSelectedFrameSize", setSelectedFrameSize);

  const ifItemInCart =
    shoppingCartList.filter((eachItem) => {
      return eachItem.id === currentParamsId_Card.id;
    }).length === 1;

  return (
    <div className="Productdetail">
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <div className="Backtoshop">
          <svg
            t="1688882332934"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1770"
            width="20"
            height="20"
          >
            <path
              d="M143 462h800c27.6 0 50 22.4 50 50s-22.4 50-50 50H143c-27.6 0-50-22.4-50-50s22.4-50 50-50z"
              p-id="1771"
              fill="#3E3E3E"
            ></path>
            <path
              d="M116.4 483.3l212.1 212.1c19.5 19.5 19.5 51.2 0 70.7s-51.2 19.5-70.7 0L45.6 554c-19.5-19.5-19.5-51.2 0-70.7 19.6-19.6 51.2-19.6 70.8 0z"
              p-id="1772"
              fill="#3E3E3E"
            ></path>
            <path
              d="M328.5 328.6L116.4 540.7c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7z"
              p-id="1773"
              fill="#3E3E3E"
            ></path>
          </svg>
          Back to Shop
        </div>
      </Link>
      <div className="productmodles">
        <div className="productmodle_img">
          <img
            src={currentParamsId_Card.img}
            alt="model1"
            className="modelsimg"
          />
        </div>
        <div className="showcase">
          <img
            src={currentParamsId_Card.img}
            alt="model1"
            className="showcaseimg"
          />
        </div>
        <div className="modelDetails">
          <div className="modelDetails_toppart">
            <div className="md_subtitle">{currentParamsId_Card.subtitle}</div>
            <div className="md_title">{currentParamsId_Card.title}</div>
            <div className="md_explaination">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              placeat similique dicta nulla praesentium deserunt. Corporis
              repellendus deleniti dolores eligendi.
            </div>
          </div>
          <div className="modelDetails_middlepart">
            <div className="glassesSize">
              <div className="gs_text">Lens Width and Frame Size</div>
              <div className="gs_selections">
                <Dropdownlist
                  dropdownName="sizelist"
                  dropdownwith={450}
                  inputLable="-- Select Size --"
                  names={[`28 mm`, `36 mm`, `42 mm`]}
                  setSelectedFrameSize={setSelectedFrameSize}
                />
              </div>
            </div>
            <div className="glassesColor">
              <div className="gc_text">Choose Color</div>
              <div className="gc_colors">
                <div className="gc_colorcircle">
                  <ColorList
                    currentColorlist={currentParamsId_Card.colors}
                    setSelectedColor={setSelectedColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modleDetails_bottompart">
            <div className="glasses_pricing">
              ${currentParamsId_Card.price}.00
            </div>

            {ifItemInCart ? (
              <div
                className="glasses_addtobask_remove"
                onClick={() => handlerRemovefromCart()}
              >
                Remove From Basket
              </div>
            ) : (
              <div
                className="glasses_addtobask"
                onClick={() => handleAddtoCart()}
              >
                Add To Basket
              </div>
            )}
          </div>
        </div>
      </div>
      <Products
        productTitle="Recommended Products"
        productsInfo={RecommendedProduct}
        whichPage="recommended"
      />
    </div>
  );
}
