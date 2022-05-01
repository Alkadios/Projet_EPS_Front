import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { EvaluationEleve } from '@/models';
import EvaluationEleveState from './stateInterface';

export default {
  namespaced: true,
  state(): EvaluationEleveState {
    return {
      evaluationEleves: [] as EvaluationEleve[],
      evaluationElevesByAnneeAndEtablissement: [] as EvaluationEleve[],
    };
  },
  mutations,
  actions,
  getters,
};
