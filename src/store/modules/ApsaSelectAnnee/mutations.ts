import { ApsaSelectAnnee } from '@/models';
import ApsaSelectAnneeState from './stateInterface';

export default {
  setApsaSelect(state: ApsaSelectAnneeState, payload: ApsaSelectAnnee[]) {
    state.apsaSelectsAnnee = payload;
  },
};
