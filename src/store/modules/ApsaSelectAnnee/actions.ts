import { ActionContext } from 'vuex';
import ApsaSelectAnneeAPI from '@/api/ApsaSelectAnnee';
import ApsaSelectAnneeState from './stateInterface';

export default {
  async fetchAllApsaSelectAnnee(context: ActionContext<ApsaSelectAnneeState, any>) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnnee();
    if (response.data['hydra:totalItems'] > 0) context.commit('setApsaSelect', response.data['hydra:member']);
    else {
      context.commit('setApsaSelect', []);
      //throw new Error(response.data.message);
    }
  },
};
