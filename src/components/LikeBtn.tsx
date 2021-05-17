import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { likeState } from '@atoms';
import { Link, f7, Icon } from 'framework7-react';
import { postLikeItem, deleteLikeItem } from '../common/api';

const LikeBtn = ({ id, isLike }) => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);

  const handleLike = async () => {
    if (isLike) {
      await deleteLikeItem(id);
      const isUnLike = likeItem.filter((item) => item.id !== id);
      setLikeItem(isUnLike);
      f7.dialog.alert('찜 리스트에서 제거되었습니다.');
    } else {
      const { data: likeData } = await postLikeItem({ item_id: id });
      // setLikeItem(likeItems);
      f7.dialog.alert('찜 리스트에 추가되었습니다.');
    }
  };

  console.log(likeItem);

  return (
    <button className="absolute w-6 h-6 right-2 bottom-2.5 z-20 focus:outline-none">
      <Link data-idx={id} onClick={handleLike}>
        {isLike ? <Icon f7="heart_fill" color="red" /> : <Icon f7="heart" />}
      </Link>
    </button>
  );
};

export default React.memo(LikeBtn);
