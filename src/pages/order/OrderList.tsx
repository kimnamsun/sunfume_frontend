import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Page, Button } from 'framework7-react';
import { getOrderList } from '@api';
import Caution from '@components/Caution';
import OrderListLineItem from '@pages/order/OrderListLineItem';

const OrderList = () => {
  const [orderItems, setOrderItems] = useState([]);

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
      {orderItems.length ? (
        orderItems.map((item, index) => <OrderListLineItem key={Number(index)} item={item} />)
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">주문 목록이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default React.memo(OrderList);
