import { AxiosResponse } from 'axios';
import { Category, Item, Token, Like } from '@constants';
import { getToken } from '@store';
import { PlainAPI, API, VERSION, API_URL } from './api.config';
import { ApiService } from './api.service';

export const refresh = (): Promise<{ data: Token }> =>
  PlainAPI.post(
    '/token',
    {},
    {
      headers: { 'X-CSRF-TOKEN': getToken().csrf, Authorization: `Bearer ${getToken().token}` },
    },
  );

export const get = (url: string, params: any) => PlainAPI.get(url, params);
export const loginAPI = (params: any) => PlainAPI.post('/login', { user: params });
export const signupAPI = (params: any) => PlainAPI.post('/signup', { user: params });
export const logoutAPI = () => API.delete('/logout');

// export const {
//   query: getItems,
//   get: getItem,
//   create: createItem,
//   update: updateItem,
//   destroy: destroyItem,
// } = ApiService('items');
// export const { query: getUsers, get: getUser } = ApiService('user');
// export const { query: getCategories, get: getCategory } = ApiService('categories');
// export const { query: getItemDetail, get: getItemDetail } = ApiService('categories');

export const getItems = (params = null) => API.get<any>('/items', { params });
export const getItemDetail = (id) => API.get(`/items/${id}`);
export const getCategories = (params = null) => API.get<Category[]>('/categories', { params });
export const getCategory = (id, params = null) => API.get<Category>(`/categories/${id}`, { params });
export const getCategoryItem = (id, params = null) => API.get<Item>(`/items/category/${id}`, { params });
export const getLikeItem = (params = null): Promise<AxiosResponse> => API.get<Like>(`/likes`, { params });
export const postLikeItem = (params = null) => API.post<Like>('/likes', { params });
export const deleteLikeItem = (id, params = null) => API.delete<Like>(`/likes/${id}`, { params });

export { API_URL, VERSION };
