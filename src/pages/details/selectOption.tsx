/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect, useRef } from 'react';
import { f7, ActionsGroup, ActionsLabel, Stepper, Actions, Icon, Button, Toolbar, List } from 'framework7-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currency } from '@js/utils';
import { postLineItem, postOrder } from '@api';
import { ItemDetail } from '@constants';
import { totalPriceState, selectOptionState, itemAmountState, likeState, lineItemCountState } from '@atoms';
import LikeBtn from '@components/LikeBtn';

const SelectOption = ({ itemDetail, id }: { itemDetail: ItemDetail; id: string }) => {
  const [itemAmount, setItemAmount] = useRecoilState(itemAmountState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);
  const likeItem = useRecoilValue(likeState);
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);
  const [selectOptionId, setSelectOptionId] = useState(null);

  const selectedOption = (e) => {
    setSelectOption(Number(e.target.value));
    setSelectOptionId(e.target.selectedOptions[0].id);
  };

  useEffect(() => {
    setTotalPrice((selectOption + (itemDetail && itemDetail.price)) * itemAmount);
  }, [selectOption, itemAmount]);

  const goToCart = async () => {
    if (itemDetail.option.length && selectOptionId === null) {
      f7.dialog.alert('옵션을 반드시 선택해주세요.');
      return;
    }

    await postOrder({
      total_price: totalPrice,
    });

    const { data } = await postLineItem({
      item_id: id,
      option_id: selectOptionId,
      quantity: itemAmount,
      total_price: totalPrice,
    });

    if (data.MESSAGE === 'exist') {
      f7.dialog.alert('이미 장바구니에 존재합니다.');
    } else {
      setLineItemCount((prev) => prev + 1);
    }

    f7.dialog.confirm('장바구니로 이동하시겠습니까?', () => {
      f7.views.current.router.navigate('/cart');
    });
  };

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

  return (
    itemDetail && (
      <>
        <Toolbar tabbar labels bottom>
          <Button raised round className="w-1/2 mx-1">
            <LikeBtn type="detail" id={itemDetail.id} isLike={likeItemArray.includes(itemDetail.id)} />
          </Button>
          <Button raised round className="w-1/2 mx-1" actionsOpen="#select-option">
            <Icon f7="cart" />
          </Button>
        </Toolbar>
        <Actions id="select-option" className="bg-white">
          <ActionsGroup>
            {itemDetail.option.length ? (
              <ActionsLabel>
                <List className="w-full m-0">
                  <select
                    className="border-solid border border-gray-300"
                    onChange={selectedOption}
                    defaultValue="default"
                  >
                    <option value="default" disabled hidden>
                      옵션 선택
                    </option>
                    {itemDetail.option.map((optionData: { id?: string; add_price?: number; name?: string }) => {
                      const { add_price, name } = optionData;
                      return (
                        <option key={optionData.id} id={optionData.id} value={add_price}>
                          {name} (+ {add_price}원)
                        </option>
                      );
                    })}
                  </select>
                </List>
              </ActionsLabel>
            ) : null}
            <ActionsLabel className="flex justify-between">
              <Stepper
                className="black"
                color="teal"
                raised
                value={itemAmount}
                min={1}
                max={itemDetail.stock}
                onStepperChange={setItemAmount}
              />
              <div className="text-black text-lg">
                총<span className="inline-block font-bold ml-3">{currency(totalPrice)}</span>원
              </div>
            </ActionsLabel>
            <ActionsLabel className="text-white">
              <Button onClick={goToCart} className="w-full" large fill actionsClose>
                장바구니 담기
              </Button>
            </ActionsLabel>
          </ActionsGroup>
        </Actions>
      </>
    )
  );
};

export default React.memo(SelectOption);
