import { ChoixAnnee } from '@/models';
import ChoixAnneeState from './stateInterface';

export default {
  setChoixAnnee(state: ChoixAnneeState, payload: ChoixAnnee) {
    state.choixAnnee = payload;
  },
  setChoixAnneeByAnneeAndEtablissement(state: ChoixAnneeState, payload: ChoixAnnee[]) {
    state.choixAnneeByAnneeAndEtablissement = payload;
  },
};
