import { Eleve } from '@/models';
import EleveState from './stateInterface';

export default {
  setEleves(state: EleveState, payload: Eleve[]) {
    state.eleves = payload;
  },
  setEleveById(state: EleveState, payload: Eleve) {
    state.eleveById = payload;
  },
  setElevesByClasse(state: EleveState, payload: Eleve[]) {
    state.elevesByClasse = payload;
  },
};
