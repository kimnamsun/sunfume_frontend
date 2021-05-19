import React from 'react';
import CartLineItem from '@pages/cart/cartLineItem';
import LikeLineItem from '@pages/likelist/likeLineItem';

const LineItem = ({ type, item }) => {
  const typeList = {
    cart: <CartLineItem item={item} />,
    like: <LikeLineItem item={item} />,
  };

  return <div className="relative flex p-2 m-2 border">{typeList[type]}</div>;
};
export default LineItem;
