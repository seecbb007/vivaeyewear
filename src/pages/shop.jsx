import React, { useState, useContext, useEffect } from "react";
import ShopProductsList from "../components/shoppages/shopProductList/shopProductList";
import shopCartContext from "../context/shopcartContext";

export default function Shop({ selectedCard }) {
  //接收Context
  const { card18, setCard18 } = useContext(shopCartContext);
  //传初始 State11
  // const [dataLength, setDataLength] = useState(11);
  //将刚刚定好的datalength放入selectedCard,选中的卡片
  const [currentDisplayCard, setCurrentDisplayCard] = useState(selectedCard);
  // 每当卡片和datalength发生改变，setSelectedCard都会重新slice card18
  useEffect(() => {
    if (selectedCard?.length > 12) {
      setCurrentDisplayCard(selectedCard.slice(0, 11));
    }
  }, []);

  return (
    <div>
      <ShopProductsList
        selectedCard={selectedCard}
        // setDataLength={setDataLength}
        setCard18={setCard18}
        card18={card18}
        currentDisplayCard={currentDisplayCard}
        setCurrentDisplayCard={setCurrentDisplayCard}
      />

      {/* <div>filter tags</div> */}
    </div>
  );
}
