import React, { useEffect, useState } from 'react';
import { Navbar, Page } from 'framework7-react';
import { getOrderList } from '@api';
import Caution from '@components/Caution';
import { Order } from '@constants';
import OrderListLineItem from '@pages/order/OrderListLineItem';

const OrderList = () => {
  const [orderItems, setOrderItems] = useState<Order>();

  const fetchData = async () => {
    try {
      const { data: orderList } = await getOrderList();
      setOrderItems(orderList);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page>
      <Navbar title="주문 목록" backLink sliding={false} />
      {orderItems ? (
        orderItems.map((item: Order, index: number) => <OrderListLineItem key={Number(index)} item={item} />)
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">주문 목록이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default React.memo(OrderList);
