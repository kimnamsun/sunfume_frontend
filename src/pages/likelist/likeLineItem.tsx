import React from 'react';
import { useRecoilValue } from 'recoil';
import { currency } from '@js/utils';
import { likeState } from '@atoms';
import { Item } from '@constants';
import LikeBtn from '@components/LikeBtn';

const LikeLineItem = ({ item }: { item: Item }) => {
  const likeItem = useRecoilValue(likeState);
  const { id, name, price } = item;

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

  return (
    <>
      <img alt="likeListImage" className="w-1/3 border rounded-lg" src={item.images[0]} />
      <div className="p-2 ml-2 w-full">
        <span>{name}</span>
        <p className="font-bold text-lg pt-2">{currency(price)}원</p>
      </div>
      <LikeBtn type="likelist" id={id} isLike={likeItemArray.includes(item.id)} />
    </>
  );
};

export default React.memo(LikeLineItem);
