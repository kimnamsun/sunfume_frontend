import React, { useState, useEffect } from 'react';
import { f7, List, ListInput, Navbar, Page } from 'framework7-react';
import { User } from '@constants';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useAuth from '@hooks/useAuth';
import { getUser, updateUser } from '@api';
import i18next from 'i18next';
import { VALIDATE_TEXT } from '@config';

interface FormValues {
  email: string;
  name: string;
  phone: string;
  birthday: Date;
}

const USER_INFO_DATAS = [
  { type: 'text', infoName: 'name', placeholder: '이름을 입력해주세요.' },
  { type: 'text', infoName: 'phone', placeholder: '휴대폰번호를 입력해주세요.' },
  { type: 'date', infoName: 'birthday', placeholder: '' },
];

const phoneRegExp = /^\d{9,11}$/;
const userInfoSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATE_TEXT.require),
  phone: Yup.string().matches(phoneRegExp, {
    message: VALIDATE_TEXT.phone,
    excludeEmptyString: false,
  }),
});

const handleUserInfo = async (id: number, params, setSubmitting) => {
  setSubmitting(true);
  try {
    const { data } = await updateUser(id, params);
    if (data.MESSAGE === 'success') {
      f7.dialog.alert('회원정보가 수정되었습니다.');
      window.location.replace('/');
    }
  } catch (error) {
    f7.dialog.alert('회원정보 수정에 실패했습니다.');
    setSubmitting(false);
  }
};

const UserInfoPage = () => {
  const [userData, setUserData] = useState<User>();
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await getUser(currentUser.id);
      setUserData(data);
    })();
  }, []);

  const initialValues: FormValues = {
    email: userData?.email,
    name: userData?.name,
    phone: userData?.phone,
    birthday: userData?.birthday,
  };

  return (
    <Page>
      <Navbar title="회원 정보" backLink sliding={false} />
      {userData && (
        <Formik
          initialValues={initialValues}
          validationSchema={userInfoSchema}
          onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) =>
            handleUserInfo(currentUser.id, values, setSubmitting)
          }
          validateOnMount
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <List>
                <ListInput disabled label="이메일" type="text" name="email" value={values.email} />
                {USER_INFO_DATAS.map(({ type, infoName, placeholder }, index: number) => (
                  <ListInput
                    key={Number(index)}
                    label={String(i18next.t(`userInfo.${infoName}`))}
                    type={type}
                    name={infoName}
                    placeholder={placeholder}
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[infoName]}
                    errorMessageForce
                    errorMessage={touched[infoName] && errors[infoName]}
                  />
                ))}
              </List>
              <div className="p-1">
                <button type="submit" className="button button-fill button-large disabled:opacity-50">
                  회원정보 수정
                </button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </Page>
  );
};

export default React.memo(UserInfoPage);
