import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import IndicateurState from './stateInterface';
import { Indicateur } from '@/models';

export default {
  namespaced: true,
  state(): IndicateurState {
    return {
      indicateurs: [] as Indicateur[],
      indicateurByCritere: [] as Indicateur[],
      indicateur: {} as Indicateur,
    };
  },
  mutations,
  actions,
  getters,
};
