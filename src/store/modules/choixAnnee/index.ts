import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { ChoixAnnee } from '@/models';
import ChoixAnneeState from './stateInterface';

export default {
  namespaced: true,
  state(): ChoixAnneeState {
    return {
      choixAnnee: {} as ChoixAnnee,
      choixAnneeByAnneeAndEtablissement: [] as ChoixAnnee[],
    };
  },
  mutations,
  actions,
  getters,
};
