import UserState from './stateInterface';

export default {
  getUser(state: UserState) {
    return state.user;
  },
  getToken(state: UserState) {
    return state.token;
  },
};
