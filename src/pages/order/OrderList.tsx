import React from 'react';
import { Navbar, Page } from 'framework7-react';
import { getOrderList } from '@api';
import Caution from '@components/Caution';
import { Order } from '@constants';
import OrderListLineItem from '@pages/order/OrderListLineItem';
import { useQuery } from 'react-query';

const OrderList = () => {
  const { data: orderItems } = useQuery<Order>('orderList', getOrderList());

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
