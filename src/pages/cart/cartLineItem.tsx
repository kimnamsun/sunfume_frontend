import React, { useEffect, useState } from 'react';
import { Stepper, Icon, f7, Link } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { deleteLineItem, updateLineItem } from '@api';
import { lineItemState } from '@atoms';

const CartLineItem = ({ item }) => {
  const { option, total_price, quantity, item_id } = item;
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const [itemAmount, setItemAmount] = useState(quantity);

  const deleteCart = async () => {
    await deleteLineItem(item.id);
    const deleteItem = lineItems.filter((data) => data.id !== item.id);
    setLineItems(deleteItem);
    f7.dialog.alert('장바구니에서 삭제되었습니다.');
  };

  const handleAmount = async () => {
    const { data } = await updateLineItem(item.id, {
      itemAmount,
    });
    console.log(data);
    // setLineItems(...lineItems);
  };

  useEffect(() => {
    handleAmount();
  }, [itemAmount]);

  return (
    item && (
      <>
        <img alt="likeListImage" className="w-1/3 border rounded-lg" src={option.item.images[0]} />
        <div className="p-2 ml-2 w-full">
          <p>
            <span>{option.item.name}</span>
            <span className="text-gray-400 ml-3">{option.name}</span>
          </p>
          <div className="flex pt-2">
            <Stepper
              className="black"
              color="teal"
              value={itemAmount}
              min={1}
              max={option.item.stock}
              raised
              manualInputMode
              onStepperChange={setItemAmount}
            />
          </div>
          <p className="font-bold text-lg pt-2">{currency(itemAmount * total_price)}원</p>
        </div>
        <div className="absolute right-3 top-3" onClick={deleteCart}>
          <Icon f7="multiply" />
        </div>
      </>
    )
  );
};

export default CartLineItem;
