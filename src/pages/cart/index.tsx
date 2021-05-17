import React, { useState, useEffect } from 'react';
import { Navbar, NavTitle, Page, Button, BlockTitle } from 'framework7-react';
import LineItem from '@components/LineItem';
import TotalPrice from './totalPrice';

const CartPage = () => (
  <Page name="cart">
    <Navbar sliding={false} backLink>
      <NavTitle>장바구니</NavTitle>
    </Navbar>{' '}
    <BlockTitle className="flex justify-between p-2 ml-1">
      <p>전체 개</p>
    </BlockTitle>
    {/* <LineItem type="cart" /> */}
    <TotalPrice />
    <Button raised large round className="m-1" href="/orders">
      전체상품 주문하기
    </Button>
  </Page>
);

export default CartPage;
