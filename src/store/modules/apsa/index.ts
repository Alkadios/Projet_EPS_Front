import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { APSA } from '@/models';
import ApsaState from "./stateInterface";

export default {
  namespaced: true,
  state(): ApsaState {
    return {
      apsas: [] as APSA[],
    };
  },
  mutations,
  actions,
  getters,
};
