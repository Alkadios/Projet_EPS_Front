import { ApsaRetenu } from '@/models';
import ApsaRetenuState from './stateInterface';

export default {
  getApsaRetenu(state: ApsaRetenuState) {
    return state.apsaRetenu;
  },
  getApsasRetenus(state: ApsaRetenuState) {
    return state.apsasRetenus;
  },
  getApsasRetenusByEtablissementAndAnnee(state: ApsaRetenuState) {
    return state.apsasRetenusByEtablissementAndAnnee;
  },
};
