import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { User } from '@/models';
import UserState from './stateInterface';

export default {
  namespaced: true,
  state(): UserState {
    return {
      users: [] as User[],
    };
  },
  mutations,
  actions,
  getters,
};
