import AfRetenusState from './stateInterface';

export default {
  getAfRetenus(state: AfRetenusState) {
    return state.afRetenus;
  },
  getAfRetenuByAnneeAndNiveauScolaire(state: AfRetenusState) {
    return state.afRetenuByAnneeAndNiveauScolaire;
  },
};
