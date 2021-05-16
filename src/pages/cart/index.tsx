import React, { useState, useEffect } from 'react';
import { Stepper, Icon, Navbar, NavTitle, Page, Button, BlockTitle } from 'framework7-react';

const CartPage = () => (
  <Page name="cart" noToolbar>
    <Navbar sliding={false} backLink>
      <NavTitle>장바구니</NavTitle>
    </Navbar>{' '}
    <BlockTitle className="flex justify-between p-2 ml-1">
      <p>전체 개</p>
    </BlockTitle>
    <div className="relative flex p-2 m-2 border">
      <img alt="" className="w-1/3 border rounded-lg" src="" />
      <div className="p-2 ml-2 w-full">
        <p>
          <span>상품이름</span>
          <span className="text-gray-400 ml-3">옵션이름</span>
        </p>
        <div className="flex pt-2">
          <Stepper className="black" color="teal" raised value={1} min={1} max={100} manualInputMode={true} />
        </div>
        <p className="font-bold text-lg pt-2">9,000원</p>
      </div>
      <div className="absolute right-3 top-3">
        <Icon f7="multiply" />
      </div>
    </div>
    <Button href="/orders" className="m-1" large raised fill>
      전체상품 주문하기
    </Button>
  </Page>
);

export default CartPage;
