export const SET_LOGIN_DATA = "SET_LOGIN_DATA";

export const setLoginData = (data) => {
  return {
    type: "SET_LOGIN_DATA",
    payload: data,
  };
};

export const SET_USERINFO = "SET_USERINFO";

export const setUserInfoData = (data) => {
  return {
    type: "SET_USERINFO",
    payload: data,
  };
};
