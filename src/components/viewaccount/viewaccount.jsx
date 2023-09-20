import React, { useEffect, useState } from "react";
import goldenAvatar from "../../assest/goldenavatar.jpg";
import "./viewaccount.css";
import userBackground from "../../assest/userbackground.jpg";

export default function Viewaccount() {
  const [usertabs, setUserTabs] = useState([
    { id: "accounttab", active: true, tabName: "Account" },
    { id: "wishList", active: false, tabName: "My Wish List" },
    { id: "orders", active: false, tabName: "My Orders" },
  ]);
  const [classNameList, setClassNameList] = useState({
    accountClassName: "accountElementShowUp",
    wishListClassName: "elementHidden",
    ordersClassName: "elementHidden",
  });

  const handleTabClick = (e) => {
    if (e.target.id === "accounttab") {
      setClassNameList({
        accountClassName: "accountElementShowUp",
        wishListClassName: "elementHidden",
        ordersClassName: "elementHidden",
      });
    }
    if (e.target.id === "wishList") {
      setClassNameList({
        accountClassName: "elementHidden",
        wishListClassName: "wishListShowUp",
        ordersClassName: "elementHidden",
      });
    }
    if (e.target.id === "orders") {
      setClassNameList({
        accountClassName: "elementHidden",
        wishListClassName: "elementHidden",
        ordersClassName: "ordersShowUp",
      });
    }
    let newTabList = usertabs?.map((eachTab) => {
      if (eachTab.id === e.target.id) {
        return {
          ...eachTab,
          active: true,
        };
      }
      return {
        ...eachTab,
        active: false,
      };
    });
    return setUserTabs(newTabList);
  };

  return (
    <div>
      <div className="viewAccount">
        <div className="viewAccountContainer">
          <div className="view_top">
            <div className="view_Tabbar">
              {usertabs?.map((eachtab) => {
                return (
                  <div
                    key={eachtab.id}
                    id={eachtab.id}
                    className={
                      eachtab.active ? "view_userTab_active" : "view_userTab"
                    }
                    onClick={(e) => handleTabClick(e)}
                  >
                    {eachtab.tabName}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="tabContent">
            <div className="view_middle">
              <img
                src={userBackground}
                alt="user_banner"
                className="userBanner"
              />
              <div className="user_avatar">
                <img
                  src={goldenAvatar}
                  alt="User_avatar"
                  className="User_avatar"
                />
              </div>
              <div className="edit_butt">Edit Account</div>
            </div>
            <div className="view_bottom">
              <div className={classNameList.accountClassName}>
                <div className="details_answer userName">
                  {JSON.parse(localStorage.getItem("token")).fullname}
                </div>
                <div className="details_title">Email</div>
                <h5 className="details_answer">
                  {JSON.parse(localStorage.getItem("email"))}
                </h5>
                <div className="details_title">Address</div>
                <h5
                  className="details_answer"
                  style={{ fontStyle: "italic", color: "#818181" }}
                >
                  Address not set
                </h5>
                <div className="details_title">Mobile</div>
                <h5 className="details_answer">Mobile not set</h5>
                <div className="details_title">Date joined</div>
                <h5 className="details_answer">
                  {new Date().toLocaleDateString() + ""}
                </h5>
              </div>

              <div className={classNameList.wishListClassName}>
                <div className="tabsText">My Wish List</div>
                <div className="tabsContent">You don't have a wish list</div>
              </div>

              <div className={classNameList.ordersClassName}>
                <div className="tabsText">My Wish Orders</div>
                <div className="tabsContent">You don't have a wish orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
