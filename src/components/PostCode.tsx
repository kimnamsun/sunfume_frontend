import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostCode = (props) => {
  const [address, setAddress] = useState('');

  // const settingFullAddress = () => {
  //   props.settingAddress(address);
  // };

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

  props.settingAddress(address);

  return <DaumPostcode autoClose onComplete={handleComplete} />;
};

export default PostCode;
