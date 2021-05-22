import React, { useEffect, useState } from 'react';
import { Navbar, Page } from 'framework7-react';
import { getOrderList } from '@api';
import Caution from '@components/Caution';
import LineProduct from '@components/LineProduct';
import { useRecoilState } from 'recoil';
import { likeState } from '@atoms';
import OrderListLineItem from '@pages/order/OrderListLineItem';

const OrderList = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [likeItem, setLikeItem] = useRecoilState(likeState);

  const getOrderItems = (data) => {
    // console.log([data.line_items[0].option.item]);
    // orderList.push(data.line_items[0].option.item);
    // return orderList;
  };

  useEffect(() => {
    (async () => {
      const { data: orderList } = await getOrderList();
      setOrderItems(orderList);
      // data.map((data) => {
      //   getOrderItems(data);
      //   console.log(getOrderItems(data));
      //   orderList.push(data.line_items[0].option.item);
      //   setOrderItems([...orderItems, ...data.line_items[0].option.item]);
      // });
    })();
  }, []);

  return (
    <Page>
      <Navbar title="주문 목록" backLink sliding={false} />
      {orderItems.length > 0 ? (
        orderItems.map((item) => <OrderListLineItem item={item} />)
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">주문 목록이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default OrderList;
