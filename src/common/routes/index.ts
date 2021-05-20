import NotFoundPage from '@pages/404';
import HomePage from '@pages/home';
import IntroPage from '@pages/intro';
import ItemIndexPage from '@pages/items';
import ItemDetailPage from '@pages/details';
import MyPage from '@pages/mypage';
import CartPage from '@pages/cart';
import LikeListPage from '@pages/likelist';
import SignUpPage from '@pages/users/registrations/new';
import LoginPage from '@pages/users/sessions/new';
import UserInfoPage from '@pages/users/info';

const routes = [
  { path: '/', component: HomePage },
  { path: '/users/sign_in', component: LoginPage },
  { path: '/users/sign_up', component: SignUpPage },
  { path: '/users/info', component: UserInfoPage },
  { path: '/intro', component: IntroPage },
  { path: '/mypage', component: MyPage },
  { path: '/category/:id', component: ItemIndexPage },
  { path: '/items/:id', component: ItemDetailPage },
  { path: '/cart', component: CartPage },
  { path: '/like', component: LikeListPage },
  { path: '(.*)', component: NotFoundPage },
];

export default routes;
