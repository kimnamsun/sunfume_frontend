import React from 'react';
import { f7, List, ListInput, Navbar, Page } from 'framework7-react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import { signupAPI } from '@api';
import useAuth from '@hooks/useAuth';
import { sleep } from '@utils';
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

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('필수 입력사항 입니다'),
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(4, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
  password_confirmation: Yup.string()
    .min(4, '길이가 너무 짧습니다')
    .max(50, '길이가 너무 깁니다')
    .required('필수 입력사항 입니다'),
});

const SignUpPage = () => {
  const { authenticateUser } = useAuth();
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  return (
    <Page>
      <Navbar title="회원가입" backLink sliding={false} />
      <DefaultTitle />
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
          await sleep(400);
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요.');
          try {
            const { data: user } = await signupAPI({ ...values });
            f7.dialog.close();
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
                회원가입
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default React.memo(SignUpPage);
