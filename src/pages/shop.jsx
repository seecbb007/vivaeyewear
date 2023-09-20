import React, { useState, useContext, useEffect } from "react";
import ShopProductsList from "../components/shoppages/shopProductList/shopProductList";
import shopCartContext from "../context/shopcartContext";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCartList } from "../actions/shoppingCartAction";

export default function Shop({ selectedCard }) {
  //接收Context
  const { card18, filterdData, productDisplayList, setProductDispalyList } =
    useContext(shopCartContext);
  //用来判断Shop页面， Filterdata有没有内容，如果为长度大于0，就显示FilterData内容，
  //如下USEEFFECT，用来更新展示filter过的数据
  useEffect(() => {
    if (filterdData?.length > 0) {
      setProductDispalyList(filterdData);
    }
  }, [filterdData]);

  return (
    <div style={{ height: "100vh" }}>
      <ShopProductsList />
    </div>
  );
}
