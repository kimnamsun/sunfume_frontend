import React, { useState, useEffect } from 'react';
import { Icon } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { toast } from '@js/utils';
import { likeState } from '@atoms';
import { postLikeItem, deleteLikeItem } from '@api';

const optionList = {
  detail: 'flex w-full h-1/2 justify-center',
  likelist: 'w-6 h-6 right-2',
  product: 'w-6 h-6 right-2',
};

const LikeBtn = ({ type, id, isLike }: { type: string; id: number; isLike: boolean }) => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);
  let toastText = '';

  const handleLike = async () => {
    if (isLike) {
      await deleteLikeItem(id);
      const isUnLike = likeItem.filter((item) => item.id !== id);
      setLikeItem(isUnLike);
      toastText = '제거';
    } else {
      const { data } = await postLikeItem({ item_id: id });
      const likeData = [data];
      setLikeItem([...likeItem, ...likeData]);
      toastText = '추가';
    }
    toast.get().setToastText(`찜 목록에 ${toastText}되었습니다.`).openToast();
  };

  return (
    <button className={`absolute ${optionList[type]} bottom-2.5 z-20 focus:outline-none`} onClick={handleLike}>
      {isLike ? <Icon f7="heart_fill" color="red" /> : <Icon f7="heart" />}
    </button>
  );
};

export default React.memo(LikeBtn);
