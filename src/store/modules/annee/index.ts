import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Annee } from '@/models';
import AnneeState from './stateInterface';

export default {
  namespaced: true,
  state(): AnneeState {
    return {
      annees: [] as Annee[],
      annee: {} as Annee,
    };
  },
  mutations,
  actions,
  getters,
};
