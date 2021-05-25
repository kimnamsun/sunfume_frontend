import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostCode = ({ settingAddress }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    settingAddress(address);
  });

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
    }
    setAddress(fullAddress);
  };

  return <DaumPostcode autoClose onComplete={handleComplete} />;
};

export default PostCode;
