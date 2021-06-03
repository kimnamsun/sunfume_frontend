import { atom } from 'recoil';
import { AuthState, LineItem } from '@constants';

const initialAuthState: AuthState = {
  token: null,
  csrf: null,
  currentUser: null,
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: initialAuthState,
});

export const likeState = atom<any[]>({
  key: 'likeState',
  default: [],
});

export const lineItemState = atom<LineItem[]>({
  key: 'lineItems',
  default: [],
});

export const selectOptionState = atom({
  key: 'selectOption',
  default: 0,
});

export const itemAmountState = atom({
  key: 'itemAmount',
  default: 1,
});

export const lineItemCountState = atom({
  key: 'lineItemCount',
  default: 0,
});
