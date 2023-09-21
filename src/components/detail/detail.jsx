import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../detail/detail.css";
import { useDispatch } from "react-redux";
import { setCurrentShoppingCartList } from "../../actions/shoppingCartAction";
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
import { useSelector } from "react-redux/es/hooks/useSelector";

import renderGlassImg from "../../utils/renderGlassImg";

export default function Productdetail({ productsInfo }) {
  const dispatch = useDispatch();
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
  }, [useParams()?.itemNumber]);
  //如果在filter数据中，filter到recommended是true的就返回这个数据在一个新数组中。
  const RecommendedProduct = productsInfo?.filter((eachitem) => {
    return eachitem.recommended === true;
  });

  //params传参，取id值
  const params = useParams();
  let paramsId = params?.itemNumber;

  //如果参选中的每一个卡片id等于传参接到的那个id，就返回那个卡片。Filter出来会是一个
  //新数组，我需要拿到它的第一位，那就是【0】

  const currentParamsId_Card = card18?.filter((eachcard) => {
    if (eachcard?.itemNumber === Number(paramsId)) {
      return eachcard;
    }
  })[0];
  // console.log("currentParamsId_Card", currentParamsId_Card);
  let itemNumber = currentParamsId_Card?.itemNumber;

  const handleAddtoCart = () => {
    // setShoppingCartList([
    //   ...shoppingCartList,
    //   {
    //     ...currentParamsId_Card,
    //     quantity: currentParamsId_Card.quantity + 1,
    //     addedInCart: true,
    //     selectedColor: selectedColor,
    //     selectedFrameSize: selectedFrameSize,
    //   },
    // ]);
    const currentParamsId_Cardinfo = {
      ...currentParamsId_Card,
      quantity: currentParamsId_Card.quantity + 1,
      selectedColor: selectedColor,
      selectedFrameSize: selectedFrameSize,
    };
    axios
      .post(
        "https://vivaser.onrender.com/api/v1/shop",
        currentParamsId_Cardinfo
      )
      .then((res) => {
        // console.log("46464", currentParamsId_Cardinfo);
        // console.log("iii", item);
        // console.log("DETAIL:add to shopping cart", res.data.data);

        // setShoppingCartList(res.data);
        axios
          .get("https://vivaser.onrender.com/api/v1/shop")
          .then((res) => {
            // console.log("Get shoppingCartList data", res.data.data);
            dispatch(setCurrentShoppingCartList(res.data.data));
          })
          .catch((error) => {
            // console.log("get shop item fail", error);
          });
      })
      .catch((error) => {
        console.log("DETAIL:addItem Failed", error);
      });
  };

  //Remove item from shopping cart
  const handlerRemovefromCart = () => {
    // const newList = shoppingCartList.filter((eachItem) => {
    //   return eachItem.itemNumber !== currentParamsId_Card.itemNumber;
    // });
    // setShoppingCartList(newList);
    let itemNumbernum = { itemNumber };
    axios
      .post(
        "https://vivaser.onrender.com/api/v1/shopproductCardDelete",
        itemNumbernum
      )
      .then((res) => {
        // console.log("shopProductCardDelete", res.data);
        // console.log("remove item", itemNumber);
        axios
          .get("https://vivaser.onrender.com/api/v1/shop")
          .then((res) => {
            // console.log("Get shoppingCartList data", res.data.data);
            dispatch(setCurrentShoppingCartList(res.data.data));
          })
          .catch((error) => {
            // console.log("get shop item fail", error);
          });
      })
      .catch((error) => {
        // console.log("Fail to remove item", error);
      });
  };
  // console.log("detail setSelectedFrameSize", setSelectedFrameSize);
  const shoppingCartData = useSelector((state) => {
    return state?.shoppingCartReducer?.shoppingCartList;
  });

  const ifItemInCart =
    shoppingCartData.filter((eachItem) => {
      return eachItem?.itemNumber === currentParamsId_Card?.itemNumber;
    })?.length === 1;

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
            src={renderGlassImg(currentParamsId_Card?.img)}
            alt="model1"
            className="modelsimg"
          />
        </div>
        <div className="showcase">
          <img
            src={renderGlassImg(currentParamsId_Card?.img)}
            alt="model1"
            className="showcaseimg"
          />
        </div>
        <div className="modelDetails">
          <div className="modelDetails_toppart">
            <div className="md_subtitle">{currentParamsId_Card?.subtitle}</div>
            <div className="md_title">{currentParamsId_Card?.title}</div>
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
                    currentColorlist={currentParamsId_Card?.colors}
                    setSelectedColor={setSelectedColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modleDetails_bottompart">
            <div className="glasses_pricing">
              ${currentParamsId_Card?.price}.00
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
