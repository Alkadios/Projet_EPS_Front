import { Eleve } from '@/models';
import EleveState from './stateInterface';

export default {
  setAfs(state: EleveState, payload: Eleve[]) {
    state.eleves = payload;
  },
};
