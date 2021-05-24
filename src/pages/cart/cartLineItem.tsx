import React, { useEffect, useState } from 'react';
import { Stepper, Icon, f7 } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { deleteLineItem, updateLineItem } from '@api';
import { lineItemState, lineItemCountState, totalPriceState } from '@atoms';

const CartLineItem = ({ item, type }) => {
  const { id, option, quantity } = item;
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);
  const [itemAmount, setItemAmount] = useState(quantity);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const deleteCart = async () => {
    await deleteLineItem(id);
    const deleteItem = lineItems.filter((data) => data.id !== id);
    setLineItems(deleteItem);
    setLineItemCount((prev) => prev - 1);
    f7.dialog.alert('장바구니에서 삭제되었습니다.');
  };

  const handleAmount = async (value: number, status: number) => {
    const price = itemAmount * option.item.price + option.add_price;
    await updateLineItem(id, { itemAmount, price });

    if (status > 0) {
      setTotalPrice(totalPrice - option.item.price + price);
    } else {
      setTotalPrice(totalPrice - price);
    }
  };

  useEffect(() => {
    setTotalPrice(
      lineItems.map(({ total_price }) => total_price).reduce((prev: number, current: number) => prev + current, 0),
    );
  }, [lineItems]);

  return (
    item && (
      <>
        <img alt="likeListImage" className="w-1/3 border rounded-lg" src={option.item.images[0]} />
        <div className="p-2 ml-2 w-full">
          <p>
            <span>{option.item.name}</span>
            <span className="text-gray-400 ml-3">{option.name}</span>
          </p>
          {type === 'cart' && (
            <div className="flex pt-2">
              <Stepper
                className="black"
                color="teal"
                value={itemAmount}
                min={1}
                max={option.item.stock}
                raised
                onStepperMinusClick={() => handleAmount(itemAmount, -1)}
                onStepperPlusClick={() => handleAmount(itemAmount, +1)}
                onStepperChange={setItemAmount}
              />
            </div>
          )}
          <p className="font-bold text-lg pt-2">{currency((option.add_price + option.item.price) * itemAmount)}원</p>
          {type === 'order' && <span>{currency(itemAmount)}개</span>}
        </div>
        {type === 'cart' && (
          <div className="absolute right-3 top-3" onClick={deleteCart}>
            <Icon f7="multiply" />
          </div>
        )}
      </>
    )
  );
};

export default React.memo(CartLineItem);
