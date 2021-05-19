import React from 'react';
import { Stepper, Icon } from 'framework7-react';
import { currency } from '@js/utils';

const CartLineItem = ({ item }) =>
  item && (
    <>
      <img alt="likeListImage" className="w-1/3 border rounded-lg" src={item.option.item.images[0]} />
      <div className="p-2 ml-2 w-full">
        <p>
          <span>{item.option.item.name}</span>
          <span className="text-gray-400 ml-3">{item.option.name}</span>
        </p>
        <div className="flex pt-2">
          <Stepper
            className="black"
            color="teal"
            raised
            value={item.quantity}
            min={item.quantity}
            max={item.option.item.stock}
            manualInputMode={true}
          />
        </div>
        <p className="font-bold text-lg pt-2">{currency(item.total_price)}원</p>
      </div>
      <div className="absolute right-3 top-3">
        <Icon f7="multiply" />
      </div>
    </>
  );

export default CartLineItem;
