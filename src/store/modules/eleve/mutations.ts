import { Eleve } from '@/models';
import EleveState from './stateInterface';

export default {
  setEleves(state: EleveState, payload: Eleve[]) {
    state.eleves = payload;
  },
};
