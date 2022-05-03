import EvaluationEleveState from './stateInterface';

export default {
  getEvaluationEleves(state: EvaluationEleveState) {
    return state.evaluationEleves;
  },

  getEvaluationElevesByAnneeAndEtablissement(state: EvaluationEleveState) {
    return state.evaluationElevesByAnneeAndEtablissement;
  },
};
