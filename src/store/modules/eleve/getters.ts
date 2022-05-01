import EleveState from './stateInterface';

export default {
  getEleves(state: EleveState) {
    return state.eleves;
  },
  getElevesByClasse(state: EleveState) {
    return state.elevesByClasse;
  },
};
