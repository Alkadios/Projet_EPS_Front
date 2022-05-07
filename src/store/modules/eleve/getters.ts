import EleveState from './stateInterface';

export default {
  getEleves(state: EleveState) {
    return state.eleves;
  },
  getEleveById(state: EleveState) {
    return state.eleveById;
  },
  getElevesByClasse(state: EleveState) {
    return state.elevesByClasse;
  },
  getElevesByAnneeAndEtablissement(state: EleveState) {
    return state.elevesByAnneeAndEtablissement;
  },
};
