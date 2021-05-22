import React from 'react';
import { f7, List, ListInput, Navbar, Page } from 'framework7-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import { loginAPI } from '@api';
import { VALIDATE_TEXT } from '@config';
import useAuth from '@hooks/useAuth';
import DefaultTitle from '@components/DefaultTitle';

interface FormValues {
  email: string;
  password: string;
}

const SIGNIN_DATAS = [
  { type: 'email', placeholder: '이메일을 입력해주세요.' },
  { type: 'password', placeholder: '비밀번호를 입력해주세요.' },
];

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required(VALIDATE_TEXT.require),
  password: Yup.string().min(4, VALIDATE_TEXT.password).max(30, VALIDATE_TEXT.password).required(VALIDATE_TEXT.require),
});

const initialValues: FormValues = { email: '', password: '' };

const SessionNewPage = () => {
  const { authenticateUser } = useAuth();

  const handleLogin = async (params, setSubmitting) => {
    setSubmitting(true);
    try {
      const { data: user } = await loginAPI({ ...params });
      authenticateUser(user);
      f7.dialog.alert('환영합니다.');
    } catch (error) {
      f7.dialog.alert(i18next.t('login.message'));
      setSubmitting(false);
    }
  };

  return (
    <Page className="bg-white">
      <Navbar title={i18next.t('login.title')} backLink sliding={false} />
      <DefaultTitle />
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => handleLogin(values, setSubmitting)}
        validateOnMount
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <List>
              {SIGNIN_DATAS.map(({ type, placeholder }, index: number) => (
                <ListInput
                  key={Number(index)}
                  label={String(i18next.t(`login.${type}`))}
                  type={type}
                  name={type}
                  placeholder={placeholder}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[type]}
                  errorMessageForce
                  errorMessage={touched[type] && errors[type]}
                />
              ))}
            </List>
            <div className="p-1">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                {i18next.t('login.title')}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default React.memo(SessionNewPage);
