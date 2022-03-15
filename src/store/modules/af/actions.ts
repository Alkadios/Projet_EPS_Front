import { ActionContext } from 'vuex';
import AfAPI from '@/api/AfAPI';
import AfState from './stateInterface';

export default {
  async fetchAllAfs(context: ActionContext<AfState, any>) {
    const response = await AfAPI.fetchAllAfs();
    if (response.data['hydra:totalItems'] > 0) context.commit('setAfs', response.data['hydra:member']);
    else {
      context.commit('setAfs', []);
      //throw new Error(response.data.message);
    }
  },
};
