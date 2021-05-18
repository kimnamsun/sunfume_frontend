import React from 'react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { likeState } from '@atoms';
import LikeBtn from '../../components/LikeBtn';

const LikeLineItem = ({ item }) => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);
  const { id, name, price } = item;

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

  return (
    <>
      <div className="p-2 ml-2 w-full">
        <span>{name}</span>
        <p className="font-bold text-lg pt-2">{currency(price)}원</p>
      </div>
      <LikeBtn type="likelist" id={id} isLike={likeItemArray.includes(item.id)} />
    </>
  );
};

export default LikeLineItem;
