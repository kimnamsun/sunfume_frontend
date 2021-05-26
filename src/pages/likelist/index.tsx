import React, { useEffect } from 'react';
import { Navbar, Page } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { getLikeItem } from '@api';
import { likeState } from '@atoms';
import { Item, PageRouteProps } from '@constants';
import LineProduct from '@components/LineProduct';
import Caution from '@components/Caution';

const LikeListPage = ({ f7route }: PageRouteProps) => {
  const [likeItem, setLikeItem] = useRecoilState(likeState);

  useEffect(() => {
    (async () => {
      const { data: likeItems } = await getLikeItem();
      setLikeItem(likeItems);
    })();
  }, []);

  return (
    <Page>
      <Navbar title="찜 목록" backLink={!f7route.query.is_main} sliding={false} />
      {likeItem.length ? (
        likeItem.map((item: Item) => <LineProduct key={item.id} type="like" item={item} />)
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">찜한 상품이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default React.memo(LikeListPage);
