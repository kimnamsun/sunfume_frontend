import React from 'react';
import { Router } from 'framework7/types';
import packageJson from '../../../package.json';

/** 리터럴 혹은 불변 객체 */
export const TOKEN_KEY = `${packageJson.name}_TOKEN`;
export const CSRF_KEY = `${packageJson.name}_CSRF`;

export const ACTIONS = {
  NEW: 'new',
  INDEX: 'index',
  EDIT: 'edit',
  SHOW: 'show',
};

export const DEFAULT_ACTIONS = Object.values(ACTIONS);

/** 인터페이스 */
/* User Auth Interfaces */
export interface Token {
  token: null | string;
  csrf: null | string;
}

export interface AuthState extends Token {
  // isLoading: boolean;
  currentUser: any; // TODO currentUser 인터페이스화
}

export interface TokenPayload {
  user: any; // TODO IToknePayload any 타입 변경
}
// Shared

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

// Tables

export interface User extends DefaultProps, Address {
  email?: string;
  name?: string;
  phone?: string;
  image_path: string;
  status?: string;
  description?: string;
  birthday?: Date;
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
  user_id: number;
  receiver_name: string;
  receiver_phone: string;
  zipcode: string;
  address1: string;
  address2: string;
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
