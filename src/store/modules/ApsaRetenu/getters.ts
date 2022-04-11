import ApsaRetenuState from './stateInterface';

export default {
  getApsaRetenu(state: ApsaRetenuState) {
    return state.apsaRetenu;
  },
  getApsasRetenus(state: ApsaRetenuState) {
    return state.apsasRetenus;
  },
};
