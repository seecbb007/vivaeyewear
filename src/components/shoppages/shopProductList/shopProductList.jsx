import React, { useContext, useEffect, useState } from "react";
import "./shopProductList.css";
import ShopProductCard from "../shopProductCard/shopProductCard";
import { Link, Params, useLocation } from "react-router-dom";
import shopCartContext from "../../../context/shopcartContext";
import { useSelector } from "react-redux/es/hooks/useSelector";
export default function ShopProductList() {
  // const showMoreItemStatus = localStorage.getItem("showMoreItem");
  const {
    showMoreItem,
    setShowMoreItem,
    productDisplayList,
    filterdData,
    card18,
    setProductDispalyList,
  } = useContext(shopCartContext);
  const [buttonclassName, setButtonClassName] = useState("showmoreitems");
  const location = useLocation();
  // 用这个state来接时常变换的SHOWMOREITEM button
  // const [currentDisplayCard, setCurrentDisplayCard] = useState(
  //   showMoreItem === true ? productDisplayList.slice(0, 11) : productDisplayList
  // );
  const [currentDisplayCard, setCurrentDisplayCard] = useState([]);

  useEffect(() => {
    setCurrentDisplayCard(
      productDisplayList?.length > 11 && showMoreItem === true
        ? productDisplayList.slice(0, 11)
        : productDisplayList
    );
  }, [productDisplayList]);

  return (
    <div className="shopProductListContainer">
      <div className="cover">
        <div className="shopProductList">
          {filterdData?.length > 0 &&
          location.pathname === "/shop" &&
          filterdData !== "notFound" ? (
            <h5 style={{ textAlign: "center", color: "#1a1a1a" }}>
              Found {filterdData?.length} products
            </h5>
          ) : (
            <div></div>
          )}

          <div className="shopproductDisplay">
            {currentDisplayCard === "notFound" ? (
              <div className="resetFilter_butt">No Result Found</div>
            ) : (
              typeof currentDisplayCard &&
              currentDisplayCard?.map((eachinfo) => {
                return (
                  <ShopProductCard
                    img={eachinfo.img}
                    title={eachinfo.title}
                    subtitle={eachinfo.subtitle}
                    price={eachinfo.price}
                    itemNumber={eachinfo.itemNumber}
                    key={eachinfo.itemNumber}
                    addedInCart={eachinfo.addedInCart}
                    quantity={eachinfo.quantity}
                    colors={eachinfo.colors}
                    framesize={eachinfo.framesize}
                  />
                );
              })
            )}
          </div>
          {/* 如果selectedCard的长度是11，就出现黑色按钮。大于11就不出现，显示null */}

          {showMoreItem === true &&
          productDisplayList?.length > 11 &&
          location.pathname === "/shop" ? (
            <div
              className={buttonclassName}
              onClick={() => {
                setCurrentDisplayCard(productDisplayList);
                setShowMoreItem(false);
                // localStorage.setItem("showMoreItem", false);
              }}
            >
              Show More Items
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

// export default class shopProductLists extends Component {
//   constructor(props) {
//     super();
//     this.state = { ...props, buttonclassName: "showmoreitems" };
//   }
//   // Shop页面里的Show More Items黑色按钮，当点击按钮启动handlemoreItems函数，调用传过来的 setDataLength={updateDataLength} updateDataLength函数。
//   // handlemoreItems = () => {
//   //   this.props.setDataLength();
//   // };
//   //如果Class里面的State，开始发生State是否改变了的判断，如果目前selectedCard不等于之前传过来的selectedCard，就会更新目前State里面的数据
//   componentDidUpdate(prevState) {
//     if (prevState.selectedCard !== this.props.selectedCard) {
//       this.setState({ ...this.props });
//     }
//   }
//   render() {
//     console.log("product selected", this.state.selectedCard);
//     return (
//       <div className="shopProductList">
//         <div className="shopproductDisplay">
//           {this.state.selectedCard.map((eachinfo) => {
//             return (
//               // <Link
//               //   to={`/productdetail/${eachinfo.id}`}
//               //   style={{ textDecoration: "none" }}
//               //   key={eachinfo.id}
//               // >
//               // </Link>

//               <ShopProductCard
//                 img={eachinfo.img}
//                 title={eachinfo.title}
//                 subtitle={eachinfo.subtitle}
//                 price={eachinfo.price}
//                 id={eachinfo.id}
//                 key={eachinfo.id}
//                 addedInCart={eachinfo.addedInCart}
//                 quantity={eachinfo.quantity}
//                 // checked={eachinfo.checked}
//               />
//             );
//           })}
//         </div>
//         {/* 如果selectedCard的长度是11，就出现黑色按钮。大于11就不出现，显示null */}

//         {this.state.selectedCard?.length === 11 ? (
//           <div
//             className={this.state.buttonclassName}
//             onClick={() => this.handlemoreItems()}
//           >
//             Show More Items
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   }
// }
