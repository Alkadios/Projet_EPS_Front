import { Critere } from '@/models';
import CritereState from './stateInterface';

export default {
  setCriteres(state: CritereState, payload: Critere[]) {
    state.criteres = payload;
  },
};
