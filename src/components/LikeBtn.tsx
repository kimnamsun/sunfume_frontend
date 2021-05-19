import React, { useState, useEffect } from 'react';
import { f7, Icon } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { likeState } from '@atoms';
import { postLikeItem, deleteLikeItem, getItemDetail } from '@api';

const optionList = {
  detail: 'flex w-full h-1/2 justify-center',
  likelist: 'w-6 h-6 right-2',
  product: 'w-6 h-6 right-2',
};

const LikeBtn = ({ type, id, isLike }) => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);
  const handleLike = async () => {
    if (isLike) {
      await deleteLikeItem(id);
      const isUnLike = likeItem.filter((item) => item.id !== id);
      setLikeItem(isUnLike);
      f7.dialog.alert('찜 리스트에서 제거되었습니다.');
    } else {
      const { data } = await postLikeItem({ item_id: id });
      setLikeItem(data);
      f7.dialog.alert('찜 리스트에 추가되었습니다.');
    }
  };

  return (
    <button className={`absolute ${optionList[type]} bottom-2.5 z-20 focus:outline-none`} onClick={handleLike}>
      {isLike ? <Icon f7="heart_fill" color="red" /> : <Icon f7="heart" />}
    </button>
  );
};

export default React.memo(LikeBtn);
