import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { ApsaRetenu } from '@/models';
import ApsaRetenuState from './stateInterface';

export default {
  namespaced: true,
  state(): ApsaRetenuState {
    return {
      apsaRetenu: {} as ApsaRetenu,
      apsasRetenus: [] as ApsaRetenu[],
      apsasRetenusByEtablissementAndAnnee: [] as ApsaRetenu[],
    };
  },
  mutations,
  actions,
  getters,
};
