import React, { useEffect, useState } from 'react';
import { Navbar, Page } from 'framework7-react';
import { getOrderList } from '@api';
import Caution from '@components/Caution';
import OrderListLineItem from '@pages/order/OrderListLineItem';

const OrderList = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: orderList } = await getOrderList();
      setOrderItems(orderList);
    })();
  }, []);

  return (
    <Page>
      <Navbar title="주문 목록" backLink sliding={false} />
      {orderItems.length > 0 ? (
        orderItems.map((item, index) => <OrderListLineItem key={Number(index)} item={item} />)
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">주문 목록이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default OrderList;
