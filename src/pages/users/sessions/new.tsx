import React from 'react';
import { f7, List, ListInput, Navbar, Page } from 'framework7-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import { loginAPI } from '@api';
import useAuth from '@hooks/useAuth';
import DefaultTitle from '@components/DefaultTitle';

interface FormValues {
  email: string;
  password: string;
}

const SIGNIN_DATAS = [
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
];

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(4, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
});

const initialValues: FormValues = { email: '', password: '' };

const SessionNewPage = () => {
  const { authenticateUser } = useAuth();

  const handleLogin = async (params, setSubmitting) => {
    setSubmitting(true);
    try {
      const { data: user } = await loginAPI({ ...params });
      authenticateUser(user);
      console.log(user);
      f7.dialog.alert('환영합니다. ');
    } catch (error) {
      f7.dialog.alert('정보를 확인 해주세요. ');
      setSubmitting(false);
    }
  };

  return (
    <Page className="bg-white">
      <Navbar title={i18next.t('login.title')} backLink sliding={false} />
      <DefaultTitle />
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => handleLogin(values, setSubmitting)}
        validateOnMount
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <List>
              {SIGNIN_DATAS.map(({ name, type, placeholder }, index: number) => (
                <ListInput
                  key={Number(index)}
                  label={String(i18next.t(`login.${name}`))}
                  type={type}
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
            </List>
            <div className="p-1">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                로그인
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default React.memo(SessionNewPage);
