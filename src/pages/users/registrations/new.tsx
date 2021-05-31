import React from 'react';
import { f7, List, ListInput, Navbar, Page } from 'framework7-react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import { signupAPI } from '@api';
import useAuth from '@hooks/useAuth';
import { VALIDATE_TEXT } from '@config';
import { sleep } from '@utils';
import { PageRouteProps } from '@constants';
import DefaultTitle from '@components/DefaultTitle';

interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SIGNUP_DATAS = [
  {
    type: 'text',
    name: 'name',
    placeholder: '이름을 입력해주세요.',
  },
  {
    type: 'email',
    name: 'email',
    placeholder: '이메일을 입력해주세요.',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: '비밀번호를 입력해주세요.',
  },
  {
    type: 'password',
    name: 'password_confirmation',
    placeholder: '비밀번호를 확인해주세요.',
  },
];

const signUpSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATE_TEXT.require),
  email: Yup.string().email().required(VALIDATE_TEXT.require),
  password: Yup.string().min(4, VALIDATE_TEXT.password).max(30, VALIDATE_TEXT.password).required(VALIDATE_TEXT.require),
  password_confirmation: Yup.string()
    .min(4, VALIDATE_TEXT.password)
    .max(50, VALIDATE_TEXT.password)
    .required(VALIDATE_TEXT.require),
});

const SignUpPage = ({ f7router }: PageRouteProps) => {
  const { authenticateUser } = useAuth();
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  return (
    <Page noToolbar>
      <Navbar title={i18next.t('signup.title')} backLink sliding={false} />
      <DefaultTitle />
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
          await sleep(400);
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요.');
          try {
            const { data: user } = await signupAPI({ ...values });
            f7.dialog.close();
            f7.dialog.alert('회원가입이 완료되었습니다!');
            f7.views.current.router.navigate('/');
            authenticateUser(user);
          } catch (error) {
            f7.dialog.close();
            f7.dialog.alert(error?.response?.data || error?.message);
          }
        }}
        validateOnMount
      >
        {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid }) => (
          <Form>
            <List noHairlinesMd>
              {SIGNUP_DATAS.map((data, index) => (
                <ListInput
                  key={Number(index)}
                  label={String(i18next.t(`login.${data.name}`))}
                  type={data.type}
                  name={data.name}
                  placeholder={data.placeholder}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[data.name]}
                  errorMessageForce
                  errorMessage={touched[data.name] && errors[data.name]}
                />
              ))}
            </List>
            <div className="p-4">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                {i18next.t('signup.title')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default React.memo(SignUpPage);
