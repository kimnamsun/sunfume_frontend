import React, { useEffect } from 'react';
import { Navbar, NavTitle, Page } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { getLikeItem } from '@api';
import { likeState } from '@atoms';
import LineProduct from '@components/LineProduct';
import Caution from '@components/Caution';

const LikeListPage = () => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);

  useEffect(() => {
    (async () => {
      const { data: likeItems } = await getLikeItem();
      setLikeItem(likeItems);
    })();
  }, []);

  return (
    <Page>
      <Navbar sliding={false} backLink>
        <NavTitle>찜 목록</NavTitle>
      </Navbar>
      {likeItem.length ? (
        likeItem.map((item) => <LineProduct key={item.id} type="like" item={item} />)
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">찜한 상품이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default React.memo(LikeListPage);
