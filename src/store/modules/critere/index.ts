import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import CritereState from './stateInterface';
import { Critere } from '@/models';

export default {
  namespaced: true,
  state(): CritereState {
    return {
      criteres: [] as Critere[],
    };
  },
  mutations,
  actions,
  getters,
};
