import { ApsaRetenu } from '@/models';
import ApsaRetenuState from './stateInterface';

export default {
  setApsaRetenu(state: ApsaRetenuState, payload: ApsaRetenu) {
    state.apsaRetenu = payload;
  },
  setApsasRetenus(state: ApsaRetenuState, payload: ApsaRetenu[]) {
    state.apsasRetenus = payload;
  },
};
