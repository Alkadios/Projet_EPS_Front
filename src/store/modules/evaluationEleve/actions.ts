import { ActionContext } from 'vuex';
import EvaluationEleveAPI from '@/api/EvaluationEleveAPI';
import EvaluationEleveState from './stateInterface';

export default {
  async fetchAllEvaluationEleve(context: ActionContext<EvaluationEleveState, any>) {
    const response = await EvaluationEleveAPI.fetchAllEvaluationEleve();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEvaluationEleves', response.data['hydra:member']);
    else {
      context.commit('setEvaluationEleves', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchEvaluationEleveByAnneeAndEtablissement(
    context: ActionContext<EvaluationEleveState, any>,
    payload: { idAnnee: number; idEtablissement: number }
  ) {
    const response = await EvaluationEleveAPI.fetchEvaluationEleveByAnneeAndEtablissement(
      payload.idAnnee,
      payload.idEtablissement
    );
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setEvaluationElevesByAnneeAndEtablissement', response.data['hydra:member']);
    } else {
      context.commit('setEvaluationElevesByAnneeAndEtablissement', []);
      //throw new Error(response.data.message);
    }
  },

  async saveEvaluationEleve(
    context: ActionContext<EvaluationEleveState, any>,
    payload: {
      Date: string;
      evaluationEleve: [
        {
          Indicateur: number;
          Eleve: number;
          autoEval: boolean;
        }
      ];
    }
  ) {
    const response = await EvaluationEleveAPI.saveEvaluationEleve(payload);
    if (response.status === 201) {
      context.commit('setEvaluationEleves', response.data);
    } else {
      context.commit('setEvaluationEleves', {});
    }
    //if (response.status !== 201) throw new Error);
  },
};
