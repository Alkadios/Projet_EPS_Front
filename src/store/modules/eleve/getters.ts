import EleveState from './stateInterface';

export default {
  getEleves(state: EleveState) {
    return state.eleves;
  },
  getEleveById(state: EleveState) {
    return state.eleveById;
  },
  getEleveByUser(state: EleveState) {
    return state.eleveByUser;
  },
  getElevesByClasse(state: EleveState) {
    return state.elevesByClasse;
  },
  getElevesByAnneeAndEtablissement(state: EleveState) {
    return state.elevesByAnneeAndEtablissement;
  },
};
