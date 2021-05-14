import { logoutAPI } from '@api';
import useAuth from '@hooks/useAuth';
import { Navbar, NavTitle, Page } from 'framework7-react';
import React, { useCallback } from 'react';

const MYPAGE_MENUS = [
  {
    name: '회원 정보 조회/수정',
    url: '',
    image_path: '',
  },
  {
    name: '주문 정보 조회',
    url: '',
    image_path: '',
  },
  {
    name: '찜 목록',
    url: '/likes/list',
    image_path: 'lar la-heart',
  },
  {
    name: '리뷰 목록',
    url: '',
    image_path: '',
  },
];

const MyPage = () => {
  const { currentUser, isAuthenticated, unAuthenticateUser } = useAuth();

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.log(e);
    } finally {
      unAuthenticateUser();
    }
  }, [unAuthenticateUser]);

  return (
    <Page name="mypage">
      <Navbar>
        <NavTitle>마이페이지</NavTitle>
      </Navbar>
      <div className="py-2">
        <div className="max-w-3xl mx-auto px-8 py-10 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">김남선님 안녕하세요!</h1>
          <p className="mt-1 text-xs font-medium text-gray-500">{currentUser ? currentUser.email : ''}</p>
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {MYPAGE_MENUS.map((menu) => {
              const { name } = menu;
              return (
                <li key={name}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
            {isAuthenticated && (
              <li>
                <a href="#" onClick={logoutHandler} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-400 truncate">로그아웃</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Page>
  );
};

export default React.memo(MyPage);
