import ChoixAnneeState from './stateInterface';

export default {
  getChoixAnnee(state: ChoixAnneeState) {
    return state.choixAnnee;
  },
  getChoixAnneeByAnneeAndEtablissement(state: ChoixAnneeState) {
    return state.choixAnneeByAnneeAndEtablissement;
  },
};
