import React, { useState, useEffect } from 'react';
import { Navbar, Page, Button, BlockTitle } from 'framework7-react';
import { useRecoilState } from 'recoil';
import LineProduct from '@components/LineProduct';
import { lineItemState, lineItemCountState } from '@atoms';
import { getLineItem } from '@api';
import Caution from '@components/Caution';
import { PageRouteProps } from '@constants';
import TotalPrice from './TotalPrice';

const CartPage = ({ f7route }: PageRouteProps) => {
  const { is_main } = f7route.query;
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
      <Navbar title="장바구니" backLink={!is_main} sliding={false} />
      {lineItems.length ? (
        <>
          <BlockTitle className="flex justify-between p-2 ml-1">
            <p>전체 {lineItemCount}개</p>
          </BlockTitle>
          {lineItems.map((item) => (
            <LineProduct key={item.id} type="cart" item={item} />
          ))}
          <TotalPrice />
          <Button raised large round className="m-1" href="/order">
            주문하기
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

export default React.memo(CartPage);
