import React from 'react';
import CartLineItem from '@pages/cart/CartLineItem';
import LikeLineItem from '@pages/likelist/LikeLineItem';

const LineItem = ({ type, item }) => {
  const typeList = {
    cart: <CartLineItem item={item} type={type} />,
    order: <CartLineItem item={item} type={type} />,
    like: <LikeLineItem item={item} />,
  };

  return <div className="relative flex p-2 mx-2 mb-2 border">{typeList[type]}</div>;
};
export default React.memo(LineItem);
