import ApsaSelectAnneeState from './stateInterface';

export default {
  getApsaSelectAnneeByAnnee(state: ApsaSelectAnneeState) {
    return state.apsaSelectAnneeByAnnee;
  },
  getApsaSelectAnneeByAnneeAndClasse(state: ApsaSelectAnneeState) {
    return state.apsaSelectAnneeByAnneeAndClasse;
  },
  getApsaSelectAnneeByAnneeAndEtablissement(state: ApsaSelectAnneeState) {
    return state.apsaSelectAnneeByAnneeAndEtablissement;
  },
  getApsaSelectAnneeByApsaAndEtablissmenetAndAnnee(state: ApsaSelectAnneeState) {
    return state.apsaSelectAnneeByApsaAndEtablissmenetAndAnnee;
  },
};
