import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import loginReducer from "./loginReducer";
import shoppingCartReducer from "./shoppingCartReducer";

const rootReducer = combineReducers({
  productsReducer,
  loginReducer,
  shoppingCartReducer,
});

export default rootReducer;
