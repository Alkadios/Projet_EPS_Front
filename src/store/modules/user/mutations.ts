import { User } from '@/models';
import UserState from './stateInterface';

export default {
  setUser(state: UserState, payload: User[]) {
    state.users = payload;
  },
};
