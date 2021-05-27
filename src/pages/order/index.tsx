import React, { useState, useEffect } from 'react';
import {
  f7,
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  AccordionContent,
  BlockTitle,
  Block,
  Button,
} from 'framework7-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useAuth from '@hooks/useAuth';
import { useRecoilState } from 'recoil';
import { lineItemState } from '@atoms';
import { updateOrder, getLineItem } from '@api';
import { sleep, toast } from '@js/utils';
import { VALIDATE_TEXT } from '@config';
import TotalPrice from '@pages/cart/TotalPrice';
import LineProduct from '@components/LineProduct';
import PostCode from '@components/PostCode';

export interface FormValues {
  name: string;
  phone: string;
  address1: string;
  status: number;
  total_price: number;
}

const phoneRegExp = /^\d{9,11}$/;
const OrderSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATE_TEXT.require),
  phone: Yup.string()
    .matches(phoneRegExp, {
      message: VALIDATE_TEXT.phone,
      excludeEmptyString: false,
    })
    .required(VALIDATE_TEXT.require),
  address1: Yup.string().required(VALIDATE_TEXT.require),
});

const OrderPage = () => {
  const [lineItems, setLineItems] = useRecoilState(lineItemState);
  const [postCodeOpen, setPostCode] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await getLineItem();
      setLineItems(data.line_items);
    })();
  }, []);

  const totalPrice = lineItems
    .map(({ total_price }) => total_price)
    .reduce((prev: number, current: number) => prev + current, 0);
  const deliveryCharge = totalPrice >= 50000 ? 0 : 3000;

  const initialValues: FormValues = {
    name: currentUser.name,
    address1: '',
    phone: currentUser.phone,
    status: 1,
    total_price: totalPrice + deliveryCharge,
  };

  return (
    <Page name="payment">
      <Navbar title="주문 정보" backLink sliding={false} />
      <List accordionList className="mt-0">
        <ListItem accordionItem title="주문상품 정보" className="p-0">
          <AccordionContent className="p-0">
            <Block>
              {lineItems.map((item) => (
                <LineProduct key={item.id} type="order" item={item} />
              ))}
            </Block>
          </AccordionContent>
        </ListItem>
        <BlockTitle className="p-2 ml-2 pb-0">주문자 정보</BlockTitle>
        <List className="mt-2">
          <Formik
            initialValues={initialValues}
            validationSchema={OrderSchema}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
              await sleep(1000);
              setSubmitting(true);
              f7.dialog.preloader('결제중입니다.');
              try {
                await updateOrder(values);
                f7.dialog.close();
                f7.dialog.alert('결제가 완료되었습니다.');
              } catch (error) {
                f7.dialog.close();
                toast
                  .get()
                  .setToastText(error?.response?.data || error?.message)
                  .openToast();
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <List className="m-0">
                  <ListInput
                    label="주문자 이름"
                    type="text"
                    name="name"
                    placeholder="이름을 입력해주세요."
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name || ''}
                    errorMessageForce
                    errorMessage={touched.name && errors.name}
                  />
                  <ListInput
                    label="주문자 휴대폰번호"
                    type="text"
                    name="phone"
                    placeholder="휴대폰번호를 입력해주세요."
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone || ''}
                    errorMessageForce
                    errorMessage={touched.phone && errors.phone}
                  />
                  <ListItem onClick={() => setPostCode(!postCodeOpen)}>
                    {!postCodeOpen ? '우편번호 찾기' : '닫기'}
                  </ListItem>
                  {postCodeOpen && <PostCode />}
                  <TotalPrice />
                </List>
                <div className="p-3">
                  <Button raised large round type="submit" className="disabled:opacity-50">
                    결제하기
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </List>
      </List>
    </Page>
  );
};
export default React.memo(OrderPage);
