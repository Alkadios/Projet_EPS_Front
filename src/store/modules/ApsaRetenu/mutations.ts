import { ApsaRetenus } from '@/models';
import ApsaRetenusState from './stateInterface';

export default {
  setApsaRetenus(state: ApsaRetenusState, payload: ApsaRetenus) {
    state.apsaRetenus = payload;
  },
};
