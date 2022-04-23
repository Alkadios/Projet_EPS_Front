import { ActionContext } from 'vuex';
import EleveAPI from '@/api/EleveAPI';
import EleveState from './stateInterface';

export default {
  async fetchAllEleves(context: ActionContext<EleveState, any>) {
    const response = await EleveAPI.fetchAllEleves();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEleves', response.data['hydra:member']);
    else {
      context.commit('setEleves', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchElevesByClasse(context: ActionContext<EleveState, any>, payload: { idClasse: number }) {
    const response = await EleveAPI.fetchElevesByClasse(payload.idClasse);
    if (response.data['hydra:totalItems'] > 0) context.commit('setElevesByClasse', response.data['hydra:member']);
    else {
      context.commit('setElevesByClasse', []);
      //throw new Error(response.data.message);
    }
  },
};
