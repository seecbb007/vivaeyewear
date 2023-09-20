import { SET_CURRENT_SHOPPING_CART_LIST } from "../actions/shoppingCartAction";

function shoppingCartReducer(state = { shoppingCartList: [] }, action) {
  // console.log("adasdasadadaa", state);
  switch (action.type) {
    case SET_CURRENT_SHOPPING_CART_LIST:
      return {
        ...state,
        shoppingCartList: action.payload,
      };
    default:
      return state;
  }
}

export default shoppingCartReducer;
