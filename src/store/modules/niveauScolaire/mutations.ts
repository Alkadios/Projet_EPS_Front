import { NiveauScolaire } from '@/models';
import NiveauScolaireState from './stateInterface';

export default {
  setNiveauxScolaires(state: NiveauScolaireState, payload: NiveauScolaire[]) {
    state.niveauxScolaires = payload;
  },
};
