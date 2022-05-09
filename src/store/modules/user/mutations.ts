import { User } from '@/models';
import UserState from './stateInterface';

export default {
  setUser(state: UserState, user: User) {
    state.user = user;
  },

  setToken(state: UserState, payload: string) {
    state.token = payload;
  },
};
