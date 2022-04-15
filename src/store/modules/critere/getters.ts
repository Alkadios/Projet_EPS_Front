import CritereState from './stateInterface';

export default {
  getCriteres(state: CritereState) {
    return state.criteres;
  },
  getCriteresByApsaRetenu(state: CritereState) {
    return state.criteresByApsaRetenu;
  },
  getCritere(state: CritereState) {
    return state.critere;
  },
};
