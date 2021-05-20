import React from 'react';
import { Navbar, NavTitle, Page } from 'framework7-react';
import useAuth from '@hooks/useAuth';

const UserInfoPage = () => {
  const { currentUser, isAuthenticated, unAuthenticateUser } = useAuth();
  return (
    <Page name="mypage">
      <Navbar backLink>
        <NavTitle>회원정보</NavTitle>
      </Navbar>
      {/* {currentUser} */}
    </Page>
  );
};

export default UserInfoPage;
