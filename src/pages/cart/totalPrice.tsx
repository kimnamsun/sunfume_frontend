import React from 'react';

const TotalPrice = ({ item }) => (
  <div className="m-1">
    <h3 className="text-lg m-2">
      총 상품 금액
      <span className="float-right font-bold">85,000원</span>
    </h3>
    <h3 className="text-lg m-2">
      총 배송비
      <span className="float-right font-bold"> + 3,000원</span>
    </h3>
    <h3 className="text-xl my-5 m-1 p-1 bg-gray-100 rounded-md">
      결제 예정 금액
      <span className="float-right font-bold text-teal-500">90,000원</span>
    </h3>
  </div>
);

export default TotalPrice;
