import React from 'react';
import { useRecoilValue } from 'recoil';
import { currency } from '@js/utils';
import { totalPriceState, deliveryChargeState } from '@selectors';

const TotalPrice = () => {
  const totalPrice = useRecoilValue(totalPriceState);
  const deliveryCharge = useRecoilValue(deliveryChargeState);

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
      {deliveryCharge ? (
        <p className="text-right text-sm px-3 py-0 text-gray-400">50,000원 이상 구매시 배송비 무료</p>
      ) : null}
      <h3 className="text-xl m-2 p-3 bg-gray-100 rounded-md">
        결제 예정 금액
        <span className="float-right font-bold text-green-500">{currency(deliveryCharge + totalPrice)}원</span>
      </h3>
    </div>
  );
};

export default React.memo(TotalPrice);
