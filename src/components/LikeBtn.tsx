import React from 'react';
import { f7, Icon } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { toast } from '@js/utils';
import { likeState } from '@atoms';
import { postLikeItem, deleteLikeItem } from '@api';
import useAuth from '@hooks/useAuth';

const optionList = {
  detail: 'flex w-full h-1/2 justify-center',
  likelist: 'w-6 h-6 right-2',
  product: 'w-6 h-6 right-2',
};

interface LikeBtnProps {
  type: string;
  id: number;
  isLike: boolean;
}

const LikeBtn = ({ type, id, isLike }: LikeBtnProps) => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);
  const { isAuthenticated } = useAuth();
  let toastText = '';

  const handleLike = async () => {
    if (isAuthenticated) {
      if (isLike) {
        await deleteLikeItem(String(id));
        const isUnLike = likeItem.filter((item) => item.id !== id);
        setLikeItem(isUnLike);
        toastText = '제거';
      } else {
        const { data } = await postLikeItem({ item_id: id });
        const likeData = [data];
        setLikeItem([...likeItem, ...likeData]);
        toastText = '추가';
        toast.get().setToastText(`찜 목록에 ${toastText}되었습니다.`).openToast();
      }
    } else {
      f7.dialog.alert('로그인이 필요합니다.');
      f7.views.current.router.navigate('/intro');
    }
  };

  return (
    <button className={`absolute ${optionList[type]} bottom-2.5 z-20 focus:outline-none`} onClick={handleLike}>
      {isLike ? <Icon f7="heart_fill" color="red" /> : <Icon f7="heart" />}
    </button>
  );
};

export default React.memo(LikeBtn);
