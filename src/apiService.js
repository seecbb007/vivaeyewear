// import React from "react";
// import axios from "axios";
// import { setShoppingCartList } from "./actions/shoppingCartAction";
// import { useDispatch, useSelector } from "react-redux";

// export const addItemToShoppingCart = (item) => {
//   //   const dispatch = useDispatch();
//   axios
//     .post("http://127.0.0.1:8080/api/v1/shop", item)
//     .then((res) => {
//       console.log("iii", item);
//       console.log("add to shopping cart api response", res.data.data);
//       //useDispatch(setShoppingCartList(res.data));
//       setShoppingCartList(res.data);
//       axios
//         .get("http://127.0.0.1:8080/api/v1/shop", item)
//         .then((res) => {
//           console.log("Get shoppingCartList data", res.data);
//         })
//         .catch((error) => {
//           console.log("get shop item fail", error);
//         });
//     })
//     .catch((error) => {
//       console.log("addItem Failed", error);
//     });
// };
