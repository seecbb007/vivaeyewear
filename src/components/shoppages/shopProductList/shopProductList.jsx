import React, { useContext, useEffect, useState } from "react";
import "./shopProductList.css";
import ShopProductCard from "../shopProductCard/shopProductCard";
import { Link, Params, useLocation } from "react-router-dom";

export default function ShopProductList({
  selectedCard,
  setDataLength,
  setCard18,
  card18,
  currentDisplayCard,
  setCurrentDisplayCard,
}) {
  const [buttonclassName, setButtonClassName] = useState("showmoreitems");
  const location = useLocation();

  // location.pathname(() => {});
  return (
    <div className="shopProductListContainer">
      <div className="shopProductList">
        <div className="shopproductDisplay">
          {currentDisplayCard?.map((eachinfo) => {
            return (
              <ShopProductCard
                img={eachinfo.img}
                title={eachinfo.title}
                subtitle={eachinfo.subtitle}
                price={eachinfo.price}
                id={eachinfo.id}
                key={eachinfo.id}
                addedInCart={eachinfo.addedInCart}
                quantity={eachinfo.quantity}
                setCard18={setCard18}
                card18={card18}
                colors={eachinfo.colors}
              />
            );
          })}
        </div>
        {/* 如果selectedCard的长度是11，就出现黑色按钮。大于11就不出现，显示null */}
        {/* {console.log(
          "selectedCard?.length ",
          selectedCard?.length,
          "currentDisplayCard?.length ",
          currentDisplayCard?.length
        )} */}
        {selectedCard?.length > currentDisplayCard?.length &&
        location.pathname === "/shop" ? (
          <div
            className={buttonclassName}
            onClick={() => {
              setCurrentDisplayCard(selectedCard);
            }}
          >
            Show More Items
          </div>
        ) : (
          ""
        )}
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
