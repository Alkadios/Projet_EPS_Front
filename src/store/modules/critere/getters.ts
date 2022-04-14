import CritereState from './stateInterface';

export default {
  getCriteres(state: CritereState) {
    return state.criteres;
  },
  getCritere(state: CritereState) {
    return state.critere;
  },
};
