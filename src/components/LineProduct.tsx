import React from 'react';
import { Item } from '@constants';
import CartLineItem from '@pages/cart/CartLineItem';
import LikeLineItem from '@pages/likelist/LikeLineItem';
import ReviewLineItem from '@pages/review/ReviewLineItem';

const LineItem = ({ type, item }) => {
  const typeList = {
    cart: <CartLineItem item={item} type={type} />,
    order: <CartLineItem item={item} type={type} />,
    like: <LikeLineItem item={item} />,
    review: <ReviewLineItem item={item} />,
  };

  return <div className="relative flex p-2 m-2 border">{typeList[type]}</div>;
};
export default React.memo(LineItem);
