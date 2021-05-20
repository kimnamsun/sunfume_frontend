import React, { useEffect, useState } from 'react';
import { Stepper, Icon, f7 } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { getLineItem, deleteLineItem, updateLineItem } from '@api';
import { lineItemState, lineItemCountState } from '@atoms';

const CartLineItem = ({ item }) => {
  const { id, option, total_price, quantity } = item;
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);
  const [itemAmount, setItemAmount] = useState(quantity);

  const deleteCart = async () => {
    await deleteLineItem(id);
    const deleteItem = lineItems.filter((data) => data.id !== id);
    setLineItems(deleteItem);
    setLineItemCount((prev) => prev - 1);
    f7.dialog.alert('장바구니에서 삭제되었습니다.');
  };

  const handleAmount = async () => {
    const { data } = await updateLineItem(id, { itemAmount });
    // setLineItems(data);
    // const updateData = [data];
    // setLineItems([...lineItems, ...updateData]);
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
          <p className="font-bold text-lg pt-2">{currency(itemAmount * option.item.price)}원</p>
        </div>
        <div className="absolute right-3 top-3" onClick={deleteCart}>
          <Icon f7="multiply" />
        </div>
      </>
    )
  );
};

export default React.memo(CartLineItem);
