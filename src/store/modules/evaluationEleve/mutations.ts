import { EvaluationEleve } from '@/models';
import EvaluationEleveState from './stateInterface';

export default {
  setEvaluationEleves(state: EvaluationEleveState, payload: EvaluationEleve[]) {
    state.evaluationEleves = payload;
  },
  setEvaluationElevesByAnneeAndEtablissement(state: EvaluationEleveState, payload: EvaluationEleve[]) {
    state.evaluationElevesByAnneeAndEtablissement = payload;
  },
};
