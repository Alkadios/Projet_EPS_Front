import UserState from './stateInterface';

export default {
  getUsers(state: UserState) {
    return state.users;
  },
};
