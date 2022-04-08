import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { ApsaRetenus } from '@/models';
import ApsaRetenusState from './stateInterface';

export default {
  namespaced: true,
  state(): ApsaRetenusState {
    return {
      apsaRetenus: {} as ApsaRetenus,
    };
  },
  mutations,
  actions,
  getters,
};
