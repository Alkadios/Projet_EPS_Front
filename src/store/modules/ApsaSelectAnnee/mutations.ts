import { ApsaSelectAnnee } from '@/models';
import ApsaSelectAnneeState from './stateInterface';

export default {
  setApsaSelectAnneeByAnnee(state: ApsaSelectAnneeState, payload: ApsaSelectAnnee[]) {
    state.apsaSelectAnneeByAnnee = payload;
  },
  setApsaSelectAnneeByAnneeAndClasse(state: ApsaSelectAnneeState, payload: ApsaSelectAnnee[]) {
    state.apsaSelectAnneeByAnneeAndClasse = payload;
  },
  setApsaSelectAnneeByAnneeAndEtablissement(state: ApsaSelectAnneeState, payload: ApsaSelectAnnee[]) {
    state.apsaSelectAnneeByAnneeAndEtablissement = payload;
  },
};
