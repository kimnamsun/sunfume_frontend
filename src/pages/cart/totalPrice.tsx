import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { lineItemState } from '@atoms';

const TotalPrice = () => {
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const totalPrice = lineItems
    .map(({ total_price }) => total_price)
    .reduce((prev: number, current: number) => prev + current, 0);
  const deliveryCharge = totalPrice >= 50000 ? 0 : 3000;

  useEffect(() => {
    // totalPrice = lineItems
    //   .map(({ total_price }) => total_price)
    //   .reduce((prev: number, current: number) => prev + current, 0);
    // deliveryCharge = totalPrice >= 50000 ? 0 : 3000;
  }, [lineItems]);

  return (
    <div className="my-5 mx-1">
      <h3 className="text-lg m-3">
        총 상품 금액
        <span className="float-right font-bold">{currency(totalPrice)}원</span>
      </h3>
      <h3 className="text-lg m-3">
        총 배송비
        <span className="float-right font-bold">{Number(deliveryCharge).toLocaleString()}원</span>
      </h3>
      <h3 className="text-xl m-2 p-3 bg-gray-100 rounded-md">
        결제 예정 금액
        <span className="float-right font-bold text-teal-500">{currency(deliveryCharge + totalPrice)}원</span>
      </h3>
    </div>
  );
};

export default React.memo(TotalPrice);
