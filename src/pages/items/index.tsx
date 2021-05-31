import React, { useEffect, useState } from 'react';
import { Navbar, NavRight, NavTitle, Page, Chip } from 'framework7-react';
import { useRecoilValue } from 'recoil';
import { getCategory, getCategoryItem } from '@api';
import { Category, Item, PageRouteProps } from '@constants';
import { currency } from '@js/utils';
import { likeState } from '@atoms';
import Product from '@components/Product';
import NavCart from '@components/NavCart';

const SORTING_DATAS = [
  {
    index: 1,
    name: '최신순',
    value: 'created_at desc',
  },
  {
    index: 2,
    name: '가격 낮은 순',
    value: 'price asc',
  },
  {
    index: 3,
    name: '가격 높은 순',
    value: 'price desc',
  },
];

const ItemIndexPage = ({ f7route }: PageRouteProps) => {
  const { is_main } = f7route.query;
  const { id } = f7route.params;
  const likeItem = useRecoilValue(likeState);
  const [category, setCategory] = useState<Category>(null);
  const [currentSorting, setCurrentSorting] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

  const fetchData = async () => {
    try {
      const { data } = await getCategoryItem(id, {
        q: { s: SORTING_DATAS[currentSorting - 1].value },
      });
      setItems(data.items);
      setTotalCount(data.total_count);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getCategory(id).then((resp) => {
        setCategory(resp.data.name);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentSorting]);

  const sortingData = (index: number) => {
    setCurrentSorting(index);
  };

  return (
    <Page ptr>
      <Navbar backLink={!is_main}>
        <NavTitle>{category}</NavTitle>
        <NavRight>
          <NavCart />
        </NavRight>
      </Navbar>

      <div className="item-list-form p-3 table w-full border-b text-center">
        총 <b>{currency((items && totalCount) || 0)}</b>개 상품
      </div>
      <div className="mx-3 my-1 text-center">
        {SORTING_DATAS.map(({ index, name }) => (
          <Chip
            key={index}
            text={name}
            className="m-2"
            onClick={() => sortingData(index)}
            outline={currentSorting !== index}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {items.map((item: Item) => {
          const { name, price, images } = item;
          return (
            <Product
              key={item.id}
              id={String(item.id)}
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
