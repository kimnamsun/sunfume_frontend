import React from 'react';
import CartLineItem from '@pages/cart/cartLineItem';
import LikeLineItem from '../pages/likelist/likeLineItem';

// const typeList = {
//   cart: <CartLineItem />,
//   like: <LikeLineItem />,
// };

const LineItem = ({ type, item }) => (
  <>
    <div className="relative flex p-2 m-2 border">
      <img alt="likeListImage" className="w-1/3 border rounded-lg" src={item.images[0]} />
      {/* {typeList[type]} */}
      {type === 'like' ? <LikeLineItem item={item} /> : <CartLineItem />}
    </div>
  </>
);
export default LineItem;
