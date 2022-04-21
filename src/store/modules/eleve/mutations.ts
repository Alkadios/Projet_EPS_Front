import { Eleve } from '@/models';
import EleveState from './stateInterface';

export default {
  setEleve(state: EleveState, payload: Eleve[]) {
    state.eleves = payload;
  },
};
