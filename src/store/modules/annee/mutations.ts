import { Annee } from '@/models';
import AnneeState from './stateInterface';

export default {
  setAnnees(state: AnneeState, payload: Annee[]) {
    state.annees = payload;
  },
  setAnnee(state: AnneeState, payload: Annee) {
    state.annee = payload;
  },
};
