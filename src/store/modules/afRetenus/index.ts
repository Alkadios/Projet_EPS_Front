import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { AfRetenus } from '@/models';
import AfRetenusState from './stateInterface';

export default {
  namespaced: true,
  state(): AfRetenusState {
    return {
      afRetenus: [] as AfRetenus[],
    };
  },
  mutations,
  actions,
  getters,
};
