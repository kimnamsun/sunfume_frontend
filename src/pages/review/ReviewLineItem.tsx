import React from 'react';
import { Item } from '@constants';
import ReviewContent from './ReviewContent';

const ReviewLineItem = ({ item }: { item: Item }) => {
  const { name, reviews } = item;

  return (
    <>
      <img alt="reviewItemImage" className="w-1/3 border rounded-lg" src={item.images[0]} />
      <div className="px-2 pt-1 ml-2 w-full">
        <span>{name}</span>
        <ReviewContent content={reviews[0].content} rating={reviews[0].rating} />
      </div>
    </>
  );
};
export default React.memo(ReviewLineItem);
