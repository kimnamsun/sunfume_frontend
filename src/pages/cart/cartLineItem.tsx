import React, { useEffect, useState } from 'react';
import { Stepper, Icon, f7 } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { currency } from '@js/utils';
import { deleteLineItem, updateLineItem, getOption, getLineItem, getCarItemDetail } from '@api';
import { lineItemState, lineItemCountState } from '@atoms';
import { Option, Item, LineItem } from '@constants';

const CartLineItem = ({ item, type }: { item: LineItem; type: string }) => {
  const { item_id, option_id, id, quantity } = item;
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);
  const [itemAmount, setItemAmount] = useState(quantity);
  const { data: options } = useQuery<Option>(`option-${option_id}`, getOption(option_id));
  const { data: items } = useQuery<Item>(`itemDetail-${item_id}`, getCarItemDetail(item_id));

  const deleteCart = async () => {
    await deleteLineItem(id);
    const deleteItem = lineItems.filter((data) => data.id !== id);
    setLineItems(deleteItem);
    setLineItemCount((prev) => prev - 1);
    f7.dialog.alert('장바구니에서 삭제되었습니다.');
  };

  const handleAmount = async () => {
    const price = (items.price + options.add_price) * itemAmount;
    await updateLineItem(id, { itemAmount, price });
  };

  useEffect(() => {
    if (items && options) {
      (async () => {
        const price = (items.price + options.add_price) * itemAmount;
        await updateLineItem(id, { itemAmount, price });
        const { data } = await getLineItem();
        setLineItems(data.line_items);
      })();
    }
  }, [itemAmount]);

  return (
    <>
      {items && options && (
        <>
          <img alt="cartLineItemImage" className="w-1/3 border rounded-lg" src={items?.images[0]} />
          <div className="p-2 ml-2 w-full">
            <p>
              <span>{items.name}</span>
              <span className="text-gray-400 ml-3">{options.name}</span>
            </p>
            {type === 'cart' && (
              <div className="flex pt-2">
                <Stepper
                  className="black"
                  color="teal"
                  value={itemAmount}
                  min={1}
                  max={items.stock}
                  raised
                  onStepperMinusClick={() => handleAmount()}
                  onStepperPlusClick={() => handleAmount()}
                  onStepperChange={setItemAmount}
                />
              </div>
            )}
            <p className="font-bold text-lg pt-2">{currency((options.add_price + items.price) * itemAmount)}원</p>
            {type === 'order' && <span>{currency(itemAmount)}개</span>}
          </div>
        </>
      )}
      {type === 'cart' && (
        <div className="absolute right-3 top-3" onClick={deleteCart}>
          <Icon f7="multiply" />
        </div>
      )}
    </>
  );
};

export default React.memo(CartLineItem);
