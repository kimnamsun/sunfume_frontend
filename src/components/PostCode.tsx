import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostCode = () => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';

      console.log(data.zonecode);
      console.log(fullAddress);
      // setZoneCode(data.zonecode);
      // setAddress(fullAddress);
      // setIsPostOpen(false);
      // console.log(isZoneCode, isAddress);
    }
  };
  return <DaumPostcode autoClose onComplete={handleComplete} />;
};

export default PostCode;
