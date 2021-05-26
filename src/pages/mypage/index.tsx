import React, { useState, useEffect, useCallback } from 'react';
import { Icon, Navbar, Page, Link } from 'framework7-react';
import { logoutAPI, getUser } from '@api';
import useAuth from '@hooks/useAuth';

const MyPage = () => {
  const { currentUser, isAuthenticated, unAuthenticateUser } = useAuth();
  const { id, name, email } = currentUser;
  const [userName, setUserName] = useState(name);

  const MYPAGE_MENUS = [
    {
      menuName: '회원 정보 조회/수정',
      url: `/users/${id}`,
      icon: 'person_crop_circle_fill',
    },
    {
      menuName: '주문 정보 조회',
      url: '/order/list',
      icon: 'bag',
    },
    {
      menuName: '찜 목록',
      url: '/like',
      icon: 'heart_fill',
    },
    {
      menuName: '리뷰 목록',
      url: '/review',
      icon: 'captions_bubble',
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await getUser(currentUser.id);
      setUserName(data.name);
    })();
  }, []);

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (e) {
      // console.log(e);
    } finally {
      unAuthenticateUser();
    }
  }, [unAuthenticateUser]);

  return (
    <Page name="mypage">
      <Navbar title="마이페이지" sliding={false} />
      <div className="py-2">
        <div className="max-w-3xl mx-auto px-8 py-10 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">{userName}님 안녕하세요!</h1>
          <p className="mt-1 text-xs font-medium text-gray-500">{currentUser ? email : ''}</p>
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {MYPAGE_MENUS.map(({ menuName, url, icon }) => (
              <li key={menuName}>
                <Link href={url} className="block hover:bg-gray-50">
                  <div className="min-w-0 flex-1 flex items-center px-7 py-4 md:grid md:grid-cols-2 md:gap-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      <Icon f7={icon} className="mr-3" />
                      {menuName}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <Link href="#" onClick={logoutHandler} className="block hover:bg-gray-50">
                  <div className="min-w-0 flex-1 flex items-center px-7 py-4 md:grid md:grid-cols-2 md:gap-4">
                    <p className="text-sm font-medium text-gray-400 truncate">
                      <Icon f7="cart" className="mr-3" />
                      로그아웃
                    </p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Page>
  );
};

export default React.memo(MyPage);
