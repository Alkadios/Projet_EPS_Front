import { AF } from '@/models';
import AfState from './stateInterface';

export default {
  setAfs(state: AfState, payload: AF[]) {
    state.afs = payload;
  },
};
