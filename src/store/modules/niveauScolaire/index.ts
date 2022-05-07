import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { NiveauScolaire } from '@/models';
import NiveauScolaireState from './stateInterface';

export default {
  namespaced: true,
  state(): NiveauScolaireState {
    return {
      niveauxScolaires: [] as NiveauScolaire[],
    };
  },
  mutations,
  actions,
  getters,
};
