import React from 'react';
import { Stepper, Icon } from 'framework7-react';

const CartLineItem = () => (
  <>
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
  </>
);

export default CartLineItem;
