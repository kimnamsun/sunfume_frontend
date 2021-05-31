import React from 'react';
import { List, ListInput } from 'framework7-react';
import { FormikProps, useFormikContext } from 'formik';
import DaumPostcode from 'react-daum-postcode';
import { FormValues } from '@pages/order';

const PostCode = () => {
  const {
    values: { address1 },
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
  }: FormikProps<FormValues> = useFormikContext();

  interface PostCodeProps {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
  }

  const handleComplete = (data: PostCodeProps) => {
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
    setFieldValue('address1', fullAddress);
  };

  return (
    <>
      <List className="m-0">
        <ListInput
          label="배송 주소"
          type="text"
          name="address1"
          placeholder="아래 주소찾기를 통해 주소를 입력하세요."
          onChange={handleChange}
          onBlur={handleBlur}
          value={address1 || ''}
          errorMessageForce
          errorMessage={touched.address1 && errors.address1}
          readonly
        />
        <DaumPostcode autoClose onComplete={handleComplete} />
      </List>
    </>
  );
};

export default React.memo(PostCode);
