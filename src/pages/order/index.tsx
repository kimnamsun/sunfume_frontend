import React, { useState } from 'react';
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
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import { useRecoilState } from 'recoil';
import { lineItemState } from '@atoms';
import { updateOrder, postOrder } from '@api';
import { sleep, toast } from '@js/utils';
import { VALIDATE_TEXT } from '@config';
import TotalPrice from '@pages/cart/TotalPrice';
import LineProduct from '@components/LineProduct';

interface FormValues {
  name: string;
  address: string;
  phone: string;
  status: number;
  total_price: number;
}

const ORDER_DATAS = [
  { name: 'name', placeholder: '이름을 입력해주세요.' },
  { name: 'phone', placeholder: '휴대폰번호를 입력해주세요.' },
  { name: 'address1', placeholder: '주소를 입력해주세요.' },
];

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
  const totalPrice = lineItems
    .map(({ total_price }) => total_price)
    .reduce((prev: number, current: number) => prev + current, 0);
  const deliveryCharge = totalPrice >= 50000 ? 0 : 3000;

  const initialValues: FormValues = {
    name: '',
    address: '',
    phone: '',
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
              setSubmitting(false);
              f7.dialog.preloader('결제중입니다.');
              try {
                await updateOrder(values);
                f7.dialog.close();
                f7.dialog.alert('결제가 완료되었습니다.');
                window.location.replace('/mypage');
              } catch (error) {
                f7.dialog.close();
                toast
                  .get()
                  .setToastText(error?.response?.data || error?.message)
                  .openToast();
              }
            }}
            validateOnMount
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
              <form onSubmit={handleSubmit}>
                <List className="m-0">
                  {ORDER_DATAS.map(({ name, placeholder }, index) => (
                    <ListInput
                      key={Number(index)}
                      label={String(i18next.t(`login.${name}`))}
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[name]}
                      errorMessageForce
                      errorMessage={touched[name] && errors[name]}
                    />
                  ))}
                  {/* <Button fill sheetOpen=".demo-sheet-swipe-to-close">
                    우편번호 찾기
                  </Button>
                  <Sheet className="demo-sheet-swipe-to-close" style={{ height: '80%' }} swipeToClose backdrop>
                    <PageContent>
                      <Block>
                        <PostCode />
                      </Block>
                    </PageContent>
                  </Sheet> */}
                  {/* {showPostCode && <PostCode setAddress={setAddress} setZoneCode={setZoneCode} />} */}
                  <TotalPrice />
                </List>
                <div className="p-3">
                  <Button
                    raised
                    large
                    round
                    type="submit"
                    className="disabled:opacity-50"
                    // disabled={isSubmitting || !isValid}
                  >
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

export default OrderPage;
