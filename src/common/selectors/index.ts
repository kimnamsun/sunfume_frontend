import _ from 'lodash';
import { selector } from 'recoil';
import { AuthState } from '@constants';
import { authState, lineItemState } from '@atoms';

export const authSelector = selector({
  key: 'authSelector',
  get: ({ get }) => get(authState),
  set: ({ set }, newAuthState: AuthState) => set(authState, newAuthState),
});

export const totalPriceState = selector({
  key: 'totalPrice',
  get: ({ get }) =>
    get(lineItemState)
      .map(({ total_price }) => total_price)
      .reduce((prev: number, current: number) => prev + current, 0),
});
