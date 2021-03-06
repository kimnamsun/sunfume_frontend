import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from 'framework7-react';
import moment from 'moment';
import { getItemDetail } from '@api';
import { currency } from '@js/utils';
import { ItemDetail, Order } from '@constants';

const OrderListLineItem = ({ item }: { item: Order }) => {
  const [items, setItems] = useState<ItemDetail>();
  const { line_items, updated_at, total_price } = item;
  const { name, images } = items;

  useEffect(() => {
    (async () => {
      const { data: itemData } = await getItemDetail(line_items[0].item_id);
      setItems(itemData);
    })();
  }, []);

  return (
    <>
      {line_items[0] && items && (
        <Card className="demo-facebook-card">
          <CardHeader className="no-border">
            <div className="text-base demo-facebook-name">{moment(updated_at).format('YYYY/MM/DD HH:mm:ss')}</div>
          </CardHeader>
          <CardContent className="flex">
            <img alt="orderListImage" className="w-1/3 border rounded-lg" src={images[0]} />
            <div className="p-2 ml-2 w-full">
              <span>{name}</span>
              {line_items.length > 1 && <span>외 {line_items.length - 1} 건</span>}
              <p className="font-bold pt-2">결제금액 : {currency(total_price)}원</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default React.memo(OrderListLineItem);
