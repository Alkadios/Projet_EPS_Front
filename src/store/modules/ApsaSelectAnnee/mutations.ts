import { ApsaSelectAnnee } from '@/models';
import ApsaSelectAnneeState from './stateInterface';

export default {
  setApsaSelectAnneeByAnnee(state: ApsaSelectAnneeState, payload: ApsaSelectAnnee[]) {
    state.apsaSelectAnneeByAnnee = payload;
  },
};
