import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import AnneeState from './stateInterface';
import { Annee } from '@/models';

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
