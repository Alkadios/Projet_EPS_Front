import AnneeState from './stateInterface';

export default {
  getAnnees(state: AnneeState) {
    return state.annees;
  },

  getAnnee(state: AnneeState) {
    return state.annee;
  },
};
