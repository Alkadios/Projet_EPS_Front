import { APSA } from '@/models';
import ApsaState from './stateInterface';

export default {
  setApsas(state: ApsaState, payload: APSA[]) {
    state.apsas = payload;
  },
};
