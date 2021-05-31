import { Router } from 'framework7/types';
import packageJson from '../../../package.json';

export const TOKEN_KEY = `${packageJson.name}_TOKEN`;
export const CSRF_KEY = `${packageJson.name}_CSRF`;

export const ACTIONS = {
  NEW: 'new',
  INDEX: 'index',
  EDIT: 'edit',
  SHOW: 'show',
};

export const DEFAULT_ACTIONS = Object.values(ACTIONS);

export interface Token {
  token: null | string;
  csrf: null | string;
}

export interface AuthState extends Token {
  currentUser: any;
}

export interface TokenPayload {
  user: any;
}

export interface PageRouteProps {
  f7route: Router.Route;
  f7router: Router.Router;
}

interface DefaultProps {
  id: number;
  model_name: string;
  created_at: string;
  updated_at: string;
}

export interface Address {
  zipcode: string;
  address1: string;
  address2?: string;
}

export interface User extends DefaultProps, Address {
  email?: string;
  name?: string;
  phone?: string;
  status?: string;
  birthday?: Date;
  reviews: Review;
}

export interface Category extends DefaultProps {
  name: string;
  image_path: string;
}

export interface Option extends DefaultProps {
  [x: string]: any;
  item_id: number;
  name: string;
  add_price: number;
  stock: number;
}

export interface Item extends DefaultProps {
  [x: string]: any;
  user_id: number;
  category_id: number;
  name: string;
  status: 'active' | 'disabled';
  capacity: string;
  price: number;
  description: string;
  category?: Category;
  images?: string;
  user?: User;
  stock?: number;
  options?: Option;
  reviews?: Review;
}

export interface ItemDetail extends DefaultProps {
  user_id: number;
  category_id: number;
  name: string;
  status: 'active' | 'disabled';
  capacity: string;
  price: number;
  description: string;
  stock: number;
  category?: Category;
  images?: Array<string>;
  option?: Array<any>;
}

export interface Like extends DefaultProps {
  user_id: number;
  item_id: number;
}

export interface LineItem extends DefaultProps {
  [x: string]: any;
  order_id: number;
  item_id: number;
  option_id: number;
  quantity: number;
  total_price: number;
}

export interface Order extends DefaultProps {
  [x: string]: any;
  user_id: number;
  name: string;
  phone: string;
  address1: string;
  total_price: number;
  status: number;
}

export interface Review extends DefaultProps {
  [x: string]: any;
  item_id: number;
  user_id: number;
  content: string;
  rating: number;
}
