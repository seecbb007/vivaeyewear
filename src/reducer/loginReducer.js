import { SET_LOGIN_DATA, SET_USERINFO } from "../actions/loginActions";

function loginReducer(
  state = {
    ifLogedin: false,

    userInfo: { fullname: "", email: "" },
  },
  action
) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return { ...state, ifLogedin: action.payload };
    case SET_USERINFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

export default loginReducer;
