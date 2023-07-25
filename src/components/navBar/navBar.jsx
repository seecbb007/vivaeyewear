import React, { useEffect, useState, useContext, useCallback } from "react";
import "./navBar.css";
import MainContext from "../shoppingcart/context";
import logo from "../../assest/eyeglasseslogo.jpg";
import Filterpopper from "../filters/filter";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import Shoppingcart from "../shoppingcart/shoppingcart";
import signContext from "../../context/signContext";
import goldenAvatar from "../../assest/goldenavatar.jpg";
import shopCartContext from "../../context/shopcartContext";
import Dropdown from "../shoppages/dropdownlist/dropdown";
import Viewaccount from "../viewaccount/viewaccount";

export default function Navbar({ shopCard18, updateFilter }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBarHeight, setNavBarHeight] = useState(150);
  const location = useLocation();
  const [searchInputValue, setSearchInputValue] = useState("");
  // false 是购物车关闭状态
  const [cartStatus, setCartStatus] = useState(false);
  const [showsignup, setShowsignup] = useState("");
  const [showsignin, setShowsignin] = useState("");
  const [userDropdownClassname, setuserDropdownClassname] = useState(false);

  const { signupInfo, setSignupInfo, ifsigned, setIfsigned } =
    useContext(signContext);

  // add to shopping cart context
  const { card18, setCard18 } = useContext(shopCartContext);
  let itemInCart_length = card18.filter((eachcard) => {
    // console.log("eacj", eachcard.addedInCart);
    return eachcard.quantity > 0;
  })?.length;
  // const providerValue = useCallback(() => {
  //   return cartStatus, setCartStatus;
  // }, [cartStatus, setCartStatus]);

  function onScroll() {
    setScrollPosition(document.documentElement.scrollTop);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    if (scrollPosition > 94) {
      setNavBarHeight(85);
    } else {
      setNavBarHeight(150);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollPosition]);
  //按下Enter键跳转
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      const searchkey = e.target.value.replace(/\s/g, "");
      navigate(`/search/${searchkey}`);
    }
  };
  //关闭开启购物车
  const handleShoppingCartClick = () => {
    setCartStatus(true);
  };

  return (
    <div>
      <MainContext.Provider value={{ cartStatus, setCartStatus }}>
        <div className="navigationBar" style={{ height: navBarHeight }}>
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="eyewearLogo" className="eyewearlogo" />
            </div>
          </Link>
          <div className="navMenu">
            {/* <NavLink
              to="/"
              className={(isActive) => {
                return isActive ? "good" : "";
              }}
            >
              Home
            </NavLink> */}
            <NavLink to="/" className="navButt">
              Home
            </NavLink>
            <NavLink to="/shop" className="navButt">
              Shop
            </NavLink>
            {/* <NavLink
              to="/shop"
              className={(isActive) => {
                return isActive ? "good" : "false";
              }}
            >
              Shop
            </NavLink> */}
            <NavLink to="/featured" className="navButt">
              Featured
            </NavLink>

            <NavLink to="/recommended" className="navButt">
              Recommended
            </NavLink>
          </div>
          <div className="searchContainer">
            <div className="filterbutt">
              {/*首先在App.js里面已经传给Navbar这些数据，再接着传入命名为Filterpopper 函数组件（filter.jsx），传shopCard18卡片数据，传 updateFilter函数 */}
              {location.pathname === "/shop" ? (
                <Filterpopper
                  shopCard18={shopCard18}
                  updateFilter={updateFilter}
                />
              ) : (
                ""
              )}
            </div>
            <div className="search">
              <span className="searchsvg">
                <svg
                  t="1686772286212"
                  className="icon"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4757"
                  width="20"
                  height="20"
                >
                  <path
                    d="M911.958045 890.721335l-241.415018-246.54112a336.369964 336.369964 0 1 0-58.095828 45.158522l247.029321 252.643623a36.859118 36.859118 0 0 0 51.749225 0 37.103218 37.103218 0 0 0 0.7323-51.261025zM176.240286 404.473897a261.431228 261.431228 0 1 1 261.431228 261.431228A261.675328 261.675328 0 0 1 176.240286 404.473897z"
                    p-id="4758"
                    fill="#8B8B8B"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                onKeyDown={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className="userMenu">
            <div
              className="shoppingsvg"
              onClick={() => {
                handleShoppingCartClick();
              }}
            >
              <svg
                t="1686770010042"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3653"
                width="30"
                height="30"
              >
                <path
                  d="M64 149.333333h64c12.949333 0 25.450667 10.965333 27.178667 23.978667l74.026666 555.029333C233.706667 762.304 264.384 789.333333 298.453333 789.333333H874.666667v-42.666666H298.474667c-12.629333 0-25.28-11.136-26.986667-23.978667L197.461333 167.68C192.938667 133.461333 162.346667 106.666667 128 106.666667H64v42.666666z"
                  fill="#1A1A1A"
                  p-id="3654"
                ></path>
                <path
                  d="M277.333333 234.666667h597.504c10.453333 0 16.853333 7.402667 15.36 17.792l-51.968 363.712c-1.813333 12.757333-14.634667 23.829333-27.669333 23.829333H341.333333a21.333333 21.333333 0 0 0 0 42.666667h469.226667c34.24 0 65.066667-26.666667 69.909333-60.458667l51.968-363.712c5.141333-36.053333-21.162667-66.496-57.6-66.496H277.333333a21.333333 21.333333 0 0 0 0 42.666667z"
                  fill="#1A1A1A"
                  p-id="3655"
                ></path>
                <path
                  d="M298.666667 896m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
                  fill="#1A1A1A"
                  p-id="3656"
                ></path>
                <path
                  d="M810.666667 896m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
                  fill="#1A1A1A"
                  p-id="3657"
                ></path>
              </svg>
              {itemInCart_length > 0 && (
                <div className="addNumber"> {itemInCart_length}</div>
              )}
            </div>
            {ifsigned === true ? (
              <div className="ifSignedContainer">
                <div
                  className="ifsigned_true"
                  onClick={() =>
                    setuserDropdownClassname(!userDropdownClassname)
                  }
                >
                  {/* <div className="signupInfo_Name">{signupInfo.fullname}</div> */}
                  <div className="signupInfo_Name">
                    {JSON.parse(localStorage.getItem("token")).fullname}
                  </div>
                  <div className="goldenAvatar">
                    <img
                      src={goldenAvatar}
                      alt="GoldenAvatar"
                      className="goldenAvatar_img"
                    />
                  </div>
                  <div className="signupInfo_svg">
                    <svg
                      className="arrowdown"
                      t="1689271581442"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2250"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z"
                        fill="#222222"
                        p-id="2251"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  className={
                    userDropdownClassname
                      ? "ifsigned_dropdown"
                      : "ifsigned_dropdownhidden"
                  }
                >
                  <div className="user_viewAccount">
                    <Link
                      to="./account"
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                      }}
                      className="linkaccount"
                    >
                      <span>View Account</span>
                      <svg
                        t="1689798888367"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3101"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M642.8 531.8c64.3-42.6 106.9-115.4 106.9-198.1C749.7 202.6 643.1 96 512 96S274.3 202.6 274.3 333.7c0 82.7 42.6 155.6 106.9 198.1C215.8 582.9 96 727.7 96 898.3c0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-180.2 159.9-326.9 356.6-326.9 196.6 0 356.6 146.6 356.6 326.9 0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-170.6-119.8-315.4-285.2-366.5zM333.7 333.7c0-98.3 80-178.3 178.3-178.3s178.3 80 178.3 178.3S610.3 512 512 512s-178.3-80-178.3-178.3z"
                          fill="#1a1a1a"
                          p-id="3102"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <div
                    className="user_signout"
                    onClick={() => setIfsigned(false)}
                  >
                    <Link
                      to="/signin"
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                      }}
                      className="linksignin"
                    >
                      <span>Sign Out</span>
                      <svg
                        t="1689798978178"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3890"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5-32.6 32.5-70.5 58.1-112.7 75.9-43.6 18.4-90 27.8-137.9 27.8-47.9 0-94.3-9.4-137.9-27.8-42.2-17.8-80.1-43.4-112.7-75.9-32.6-32.5-58.1-70.4-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-0.4-12.3-6.7-12.3z m88.9-226.3L815 393.7c-5.3-4.2-13-0.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112c4.1-3.2 4.1-9.4 0-12.6z"
                          fill="#1a1a1a"
                          p-id="3891"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="signUpIn">
                {location.pathname !== "/signup" && (
                  <Link to="/signup">
                    <button className="signUp">Sign Up</button>
                  </Link>
                )}
                {location.pathname !== "/signin" && (
                  <Link to="/signin">
                    <button className="signIn">Sign In</button>
                  </Link>
                )}
              </div>
            )}
          </div>
          <Shoppingcart
            cartStatus={cartStatus}
            handleShoppingCartClick={handleShoppingCartClick}
          />
        </div>
      </MainContext.Provider>
    </div>
  );
}
