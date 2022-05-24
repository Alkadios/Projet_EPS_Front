import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Professeur } from '@/models';
import ProfesseurState from './stateInterface';

export default {
  namespaced: true,
  state(): ProfesseurState {
    return {
      professeurs: [] as Professeur[],
      professeursByEtablissement: [] as Professeur[],
      professeurByRoles: [] as Professeur[],
      professeurById: {} as Professeur,
      professeurByUser: {} as Professeur,
    };
  },
  mutations,
  actions,
  getters,
};
