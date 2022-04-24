import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Etablissement, User } from '@/models';
import EtablissementState from './stateInterface';

export default {
  namespaced: true,
  state(): EtablissementState {
    return {
      etablissements: [] as Etablissement[],
    };
  },
  mutations,
  actions,
  getters,
};
