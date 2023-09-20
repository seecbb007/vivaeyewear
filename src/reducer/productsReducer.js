import { SET_PRODUCTS } from "../actions/productsAction";

function ProductsReducer(
  state = {
    allglassesProducts: [],
  },
  action
) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...action.payload };
    default:
      return state;
  }
}
export default ProductsReducer;

// const initialState = {
//   products: [],
// };

// function reducer (
//   state = {
//     products: {},
//   },
//   action
// ) => {
//   switch (action.type) {
//     case SET_PRODUCTS: {
//       return {
//         // ...state,
//         // products: action.payload,
//         ...action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };
