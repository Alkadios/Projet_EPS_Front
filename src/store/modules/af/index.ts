import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { AF } from '@/models';
import AfState from './stateInterface';

export default {
  namespaced: true,
  state(): AfState {
    return {
      afs: [] as AF[],
    };
  },
  mutations,
  actions,
  getters,
};
