import React, { useState, useEffect } from 'react';
import { Navbar, NavTitle, Page, Button, BlockTitle } from 'framework7-react';
import LineProduct from '@components/LineProduct';
import { LineItem } from '@constants';
import { getLineItem } from '@api';
import Caution from '@components/Caution';
import TotalPrice from './totalPrice';

const CartPage = () => {
  const [lineItems, setLineItems] = useState<LineItem>();
  const [lineItemCount, setLineItemCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await getLineItem();
      setLineItems(data.line_items);
      setLineItemCount(data.total_count);
    })();
  }, []);

  return (
    <Page name="cart">
      <Navbar sliding={false} backLink>
        <NavTitle>장바구니</NavTitle>
      </Navbar>
      {lineItems && lineItems.length ? (
        <>
          <BlockTitle className="flex justify-between p-2 ml-1">
            <p>전체 {lineItemCount}개</p>
          </BlockTitle>
          {lineItems.map((item) => {
            return <LineProduct type="cart" item={item} />;
          })}
          <TotalPrice item={lineItems} />
          <Button raised large round className="m-1" href="/orders">
            전체상품 주문하기
          </Button>
        </>
      ) : (
        <Caution>
          <span className="text-lg p-10 font-bold">장바구니에 상품이 없습니다.</span>
        </Caution>
      )}
    </Page>
  );
};

export default CartPage;
