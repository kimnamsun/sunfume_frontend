import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent } from 'framework7-react';
import { currency } from '@js/utils';

const OrderListLineItem = ({ item }) => {
  const { updated_at, total_price } = item;

  const dateFormat = (date: string) => {
    const ymd = date.split('T')[0];
    const time = date.split('T')[1].split('.')[0];
    return `${ymd} ${time}`;
  };

  return (
    <>
      <Card className="demo-facebook-card">
        <CardHeader className="no-border">
          <div className="demo-facebook-name">{dateFormat(updated_at)}</div>
        </CardHeader>
        <CardContent className="flex">
          <img
            alt="orderListImage"
            className="w-1/3 border rounded-lg"
            src={item.line_items[0].option.item.images[0]}
          />
          <div className="p-2 ml-2 w-full">
            <span>{item.line_items[0].option.item.name}</span>
            <p className="font-bold pt-2">결제금액 : {currency(total_price)}원</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderListLineItem;
