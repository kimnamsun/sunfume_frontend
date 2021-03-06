import HomePage from '@pages/home';
import IntroPage from '@pages/Intro';
import LoginPage from '@pages/users/sessions/new';
import SignUpPage from '@pages/users/registrations/new';
import UserInfoPage from '@pages/users/info';
import ItemIndexPage from '@pages/items';
import ItemDetailPage from '@pages/details';
import CartPage from '@pages/cart';
import OrderPage from '@pages/order';
import OrderListPage from '@pages/order/OrderList';
import LikeListPage from '@pages/likelist';
import MyPage from '@pages/mypage';
import ReviewPage from '@pages/review/Review';
import NotFoundPage from '@pages/404';

const routes = [
  { path: '/', component: HomePage },
  { path: '/users/sign_in', component: LoginPage },
  { path: '/users/sign_up', component: SignUpPage },
  { path: '/users/:id', component: UserInfoPage },
  { path: '/intro', component: IntroPage },
  { path: '/category/:id', component: ItemIndexPage },
  { path: '/items/:id', component: ItemDetailPage },
  { path: '/cart', component: CartPage },
  { path: '/order', component: OrderPage },
  { path: '/order/list', component: OrderListPage },
  { path: '/like', component: LikeListPage },
  { path: '/review', component: ReviewPage },
  { path: '/mypage', component: MyPage },
  { path: '(.*)', component: NotFoundPage },
];

export default routes;
