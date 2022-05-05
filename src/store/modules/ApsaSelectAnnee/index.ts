import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { ApsaSelectAnnee } from '@/models';
import ApsaSelectAnneeState from './stateInterface';

export default {
  namespaced: true,
  state(): ApsaSelectAnneeState {
    return {
      apsaSelectAnneeByAnnee: [] as ApsaSelectAnnee[],
      apsaSelectAnneeByAnneeAndClasse: [] as ApsaSelectAnnee[],
      apsaSelectAnneeByAnneeAndEtablissement: [] as ApsaSelectAnnee[],
      apsaSelectAnneeByApsaAndEtablissmenetAndAnnee: [] as ApsaSelectAnnee[],
    };
  },
  mutations,
  actions,
  getters,
};
