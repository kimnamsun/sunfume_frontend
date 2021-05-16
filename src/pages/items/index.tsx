import { API_URL, getCategory, getCategoryItem } from '@api';
import { Item } from '@constants';
import { currency } from '@js/utils';
import { useFormik } from 'formik';
import { Link, ListInput, Navbar, NavRight, NavTitle, Page } from 'framework7-react';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import Product from '@components/Product';
import i18n from '../../assets/lang/i18n';

const SortStates = [
  ['created_at desc', '최신순'],
  ['sale_price desc', '높은가격순'],
  ['sale_price asc', '낮은가격순'],
] as const;
type SortState = typeof SortStates[number][0];

interface ItemFilterProps {
  s: SortState;
  category_id_eq: string;
}

const ItemIndexPage = ({ f7route }) => {
  const { is_main } = f7route.query;
  const { id } = f7route.params;
  const [viewType, setViewType] = useState('grid');
  const [category, setCategory] = useState(null);

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
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

  const filterForm = useFormik<ItemFilterProps>({
    initialValues: {
      s: 'created_at desc',
      category_id_eq: id,
    },
    onSubmit: async () => {
      // await queryClient.removeQueries(ITEM_KEY);
      // await refetch();
    },
  });

  // const { data, refetch } = useQuery<Items, Error>(
  //   ITEM_KEY,
  //   getItems({
  //     q: filterForm.values,
  //   }),
  // );

  const onRefresh = async (done) => {
    // await queryClient.removeQueries(ITEM_KEY);
    // await refetch();
    done();
  };

  return (
    <Page noToolbar={!is_main} onPtrRefresh={onRefresh} ptr>
      <Navbar backLink={!is_main}>
        <NavTitle>{category}</NavTitle>
        <NavRight>
          <Link href="/cart" iconF7="cart" iconBadge={3} badgeColor="red" />
        </NavRight>
      </Navbar>

      <form onSubmit={filterForm.handleSubmit} className="item-list-form p-3 table w-full border-b">
        <div className="float-left">
          총 <b>{currency((items && totalCount) || 0)}</b>개 상품
        </div>
        {/* <ListInput
          type="select"
          className="float-right inline-flex items-center px-2.5 py-3 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          name="s"
          onChange={(e) => {
            filterForm.handleChange(e);
            filterForm.submitForm();
          }}
          value={filterForm.values.s}
        >
          {map(SortStates, (v, idx) => (
            <option value={v[0]} key={idx}>
              {v[1]}
            </option>
          ))}
        </ListInput> */}
      </form>
      <div className="grid grid-cols-2 gap-2 p-2">
        {items.map((item: Item) => (
          <Product key={item.id} id={item.id} name={item.name} price={item.price} image={item.images[0]} />
        ))}
      </div>
    </Page>
  );
};

export default React.memo(ItemIndexPage);
