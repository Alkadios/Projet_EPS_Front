import CritereState from './stateInterface';

export default {
  getCriteres(state: CritereState) {
    return state.criteres;
  },
  getCriteresByApsaRetenu(state: CritereState) {
    return state.criteresByApsaRetenu;
  },
  getCriteresByAnneeApsaRetenuAndAfRetenu(state: CritereState) {
    return state.criteresByAnneeApsaRetenuAndAfRetenu;
  },
  getCritere(state: CritereState) {
    return state.critere;
  },
};
