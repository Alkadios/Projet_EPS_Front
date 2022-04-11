import { AfRetenus } from '@/models';
import AfRetenusState from './stateInterface';

export default {
  setAfRetenus(state: AfRetenusState, payload: AfRetenus[]) {
    state.afRetenus = payload;
  },
  setAfRetenuByAnneeAndNiveauScolaire(state: AfRetenusState, payload: AfRetenus[]) {
    state.afRetenuByAnneeAndNiveauScolaire = payload;
  },
};
