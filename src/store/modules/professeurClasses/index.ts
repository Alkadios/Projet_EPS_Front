import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { ProfesseurClasses } from '@/models';
import ProfesseurClassesState from './stateInterface';

export default {
  namespaced: true,
  state(): ProfesseurClassesState {
    return {
      professeurClasses: [] as ProfesseurClasses[],
      classesByProfesseur: [] as ProfesseurClasses[],
    };
  },
  mutations,
  actions,
  getters,
};
