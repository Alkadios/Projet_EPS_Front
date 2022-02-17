import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import ChampApprentissageState from './stateInterface';
import { ChampApprentissage } from '@/models';

export default {
  namespaced: true,
  state(): ChampApprentissageState {
    return {
      champsApprentissages: [] as ChampApprentissage[],
    };
  },
  mutations,
  actions,
  getters,
};
