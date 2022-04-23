import ApsaSelectAnneeState from './stateInterface';

export default {
  getApsaSelectAnneeByAnnee(state: ApsaSelectAnneeState) {
    return state.apsaSelectAnneeByAnnee;
  },
  getApsaSelectAnneeByAnneeAndClasse(state: ApsaSelectAnneeState) {
    return state.apsaSelectAnneeByAnneeAndClasse;
  },
};
