import { ActionContext } from 'vuex';
import ApsaAPI from '@/api/ApsaAPI';
import ApsaState from './stateInterface';

export default {
  async fetchAllApsa(context: ActionContext<ApsaState, any>) {
    const response = await ApsaAPI.fetchAllApsa();
    if (response.data['hydra:totalItems'] > 0) context.commit('setApsas', response.data['hydra:member']);
    else {
      context.commit('setApsas', []);
      //throw new Error(response.data.message);
    }
  },
};
