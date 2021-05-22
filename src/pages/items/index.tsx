import React, { useEffect, useState } from 'react';
import { Navbar, NavRight, NavTitle, Page } from 'framework7-react';
import { useRecoilValue } from 'recoil';
import { getCategory, getCategoryItem } from '@api';
import { Item } from '@constants';
import { currency } from '@js/utils';
import { likeState } from '@atoms';
import Product from '@components/Product';
import NavCart from '@components/NavCart';

const ItemIndexPage = ({ f7route }) => {
  const { is_main } = f7route.query;
  const { id } = f7route.params;
  const [category, setCategory] = useState(null);
  const likeItem = useRecoilValue(likeState);

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

  useEffect(() => {
    if (id) {
      getCategory(id).then((resp) => {
        setCategory(resp.data.name);
      });
    }
    (async () => {
      const { data } = await getCategoryItem(id);
      setItems(data.items);
      setTotalCount(data.total_count);
    })();
  }, []);

  return (
    <Page ptr>
      <Navbar backLink={!is_main}>
        <NavTitle>{category}</NavTitle>
        <NavRight>
          <NavCart />
        </NavRight>
      </Navbar>

      <div className="item-list-form p-3 table w-full border-b">
        <div className="float-left">
          총 <b>{currency((items && totalCount) || 0)}</b>개 상품
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {items.map((item: Item) => {
          const { name, price, images } = item;
          return (
            <Product
              key={item.id}
              id={item.id}
              name={name}
              price={price}
              image={images[0]}
              isLike={likeItemArray.includes(item.id)}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default React.memo(ItemIndexPage);
