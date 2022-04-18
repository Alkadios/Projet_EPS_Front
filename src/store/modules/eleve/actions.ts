import { ActionContext } from 'vuex';
import EleveApi from '@/api/EleveAPI';
import EleveState from './stateInterface';

export default {
  async fetchAllEleves(context: ActionContext<EleveState, any>) {
    const response = await EleveApi.fetchAllEleves();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEleves', response.data['hydra:member']);
    else {
      context.commit('setEleves', []);
      //throw new Error(response.data.message);
    }
  },
};
