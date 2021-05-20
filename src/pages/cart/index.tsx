import React, { useState, useEffect } from 'react';
import { Navbar, NavTitle, Page, Button, BlockTitle } from 'framework7-react';
import { useRecoilState } from 'recoil';
import LineProduct from '@components/LineProduct';
import { lineItemState, lineItemCountState } from '@atoms';
import { getLineItem } from '@api';
import Caution from '@components/Caution';
import TotalPrice from './totalPrice';

const CartPage = () => {
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);

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
      {lineItems ? (
        <>
          <BlockTitle className="flex justify-between p-2 ml-1">
            <p>전체 {lineItemCount}개</p>
          </BlockTitle>
          {lineItems.map((item) => (
            <LineProduct key={item.id} type="cart" item={item} />
          ))}
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
