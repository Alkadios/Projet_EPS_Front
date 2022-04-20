import { ActionContext } from 'vuex';
import AnneeAPI from '@/api/AnneeAPI';
import AnneeState from './stateInterface';

export default {
  async fetchAllAnnee(context: ActionContext<AnneeState, any>) {
    const response = await AnneeAPI.fetchAllAnnee();
    if (response.data['hydra:totalItems'] > 0) context.commit('setAnnees', response.data['hydra:member']);
    else {
      context.commit('setAnnees', []);
      //throw new Error(response.data.message);
    }
  },
};
