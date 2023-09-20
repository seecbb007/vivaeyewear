import React, { useState, useEffect, useContext } from "react";
// import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./actions/productsAction";
import { setCurrentShoppingCartList } from "./actions/shoppingCartAction";

import NavBar from "./components/navBar/navBar";
import Hero from "./components/hero/hero";
import Products from "./components/products/products";
import SignupIn from "./components/signup/signupIn";
import Search from "./components/search/search";
import signContext from "./context/signContext";
import shopCartContext from "./context/shopcartContext";
import allContext from "./context";
import Account from "./pages/account";
import Checkout from "./pages/checkout";
import Confirmation from "./components/checkoutstep/confirmation/confirmation";

import Footer from "./components/footer/footer";
import ShopProductsList from "./components/shoppages/shopProductList/shopProductList";
import FeaturedProducts from "./components/featuredpages/featuredproducts/featuredproducts";
import Productdetail from "./components/detail/detail";
import img_green from "../src/assest/green.jpg";
import CheckoutStep1 from "./components/checkoutstep/checkoutstep1";
import CheckoutStep2 from "./components/checkoutstep/checkoutstep2";
import CheckoutStep3 from "./components/checkoutstep/checkoutstep3";

//Routes
import Home from "./pages/home";
import Shop from "./pages/shop";
import Featured from "./pages/featured";
import Recommended from "./pages/recommended";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/")
      .then((res) => {
        console.log("/ response.data", res.data);
        dispatch(setProducts(res.data));
      })
      .catch((error) => {
        console.log("could not get data from server", error);
      });

    axios
      .get("http://127.0.0.1:8080/api/v1/shop")
      .then((res) => {
        console.log("Get shoppingCartList data", res.data.data);
        dispatch(setCurrentShoppingCartList(res.data.data));
      })
      .catch((error) => {
        console.log("get shop item fail", error);
      });
  }, []);

  //Get Data from  Backend Server

  //Shop页面中的18张眼镜卡片里的所有资料：img,title,subtitle,price
  const Shopcard18 = useSelector((state) => {
    return state.productsReducer?.data?.glassesProducts;
  });

  // const iflogedin = useSelector((state) => {
  //   return state?.loginReducer.ifLogedin;
  // });
  // console.log("app", iflogedin);
  const ifSignedStatus = localStorage.getItem;
  //定义useState,把18张卡片传进去。
  const [card18, setCard18] = useState(Shopcard18);
  useEffect(() => {
    setCard18(Shopcard18);
    setFilterdData(Shopcard18);
  }, [Shopcard18]);

  // console.log("shopcard18", Shopcard18);
  // const card18 = useSelector((state) => {
  //   return state.productsReducer?.data?.glassesProducts;
  // });
  //定义useState,为了取得实时变量signupInfo
  const [signupInfo, setSignupInfo] = useState("");
  //取local Storage里面的token，赋值到signed
  const signed = localStorage.getItem("token");
  // const signed = false;
  // 定义useState, 确定user有没有登录，有就return true，没有拿到token就是False。
  const [ifsigned, setIfsigned] = useState(signed ? true : false);
  //设置useState状态，selectedCard变量名，setselectedCard函数，初始值里嵌套了数组方法slice0-11个卡片，也就是会出现12个卡片

  //定义函数filterdData, 并设置进context
  const [filterdData, setFilterdData] = useState(Shopcard18);
  //showMoreItem 按钮
  const [showMoreItem, setShowMoreItem] = useState(true);
  //shoppingCartList 购物车State
  const [shoppingCartList, setShoppingCartList] = useState([]);
  // shop页面显示State
  const [productDisplayList, setProductDispalyList] = useState(card18);
  const [shippingCost, setShippingCost] = useState(0);

  //Auth function to check login status for Shop page。If the user did not sign in, it will redirect to sign in page.Otherwise, it can access Shop page
  function Auth({ children }) {
    //let islogin = iflogedin;
    // console.log("auth", islogin);
    let islogin = localStorage.getItem("token");
    return islogin ? children : <Navigate to="/signin"></Navigate>;
  }
  // useEffect(() => {
  //   localStorage.setItem("showMoreItem", false);
  // }, [showMoreItem]);

  return (
    <BrowserRouter>
      <shopCartContext.Provider
        value={{
          card18,
          // setCard18,
          filterdData,
          setFilterdData,
          shoppingCartList,
          setShoppingCartList,
          showMoreItem,
          setShowMoreItem,
          productDisplayList,
          setProductDispalyList,
          shippingCost,
          setShippingCost,
        }}
      >
        <signContext.Provider
          value={{ signupInfo, setSignupInfo, ifsigned, setIfsigned }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home productsInfo={card18} />}></Route>
              <Route path="/shop" element={<Shop />}></Route>
              <Route
                path="/featured"
                element={<Featured productsInfo={card18} />}
              ></Route>
              <Route
                path="/recommended"
                element={<Recommended productsInfo={card18} />}
              ></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route
                path="/productdetail/:itemNumber"
                element={
                  <Productdetail
                    // Shopcard18={Shopcard18}
                    productsInfo={card18}
                  />
                }
              ></Route>
              <Route
                path="/search/:searchid"
                element={<Search productsInfo={card18} />}
              ></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route
                path="/checkout"
                element={
                  <Auth>
                    <Checkout />
                  </Auth>
                }
              >
                <Route path="step1" element={<CheckoutStep1 />}></Route>
                <Route path="step2" element={<CheckoutStep2 />}></Route>
                <Route path="step3" element={<CheckoutStep3 />}></Route>
                <Route path="confirmation" element={<Confirmation />}></Route>
              </Route>
            </Routes>
            {/* 函数传参Shopcard18个卡片，传参：updateFilter函数，这样navbar里面就能使用这些数据和函数 */}
            <NavBar shopCard18={card18} />
          </div>
        </signContext.Provider>
      </shopCartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
