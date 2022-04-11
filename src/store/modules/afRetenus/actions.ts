import { ActionContext } from 'vuex';
import AfRetenuAPI from '@/api/AfRetenu';
import AfRetenusState from './stateInterface';

export default {
  async fetchAllAfRetenus(context: ActionContext<AfRetenusState, any>) {
    const response = await AfRetenuAPI.fetchAllAfRetenus();
    if (response.data['hydra:totalItems'] > 0) context.commit('setAfRetenus', response.data['hydra:member']);
    else {
      context.commit('setAfRetenus', []);
      //throw new Error(response.data.message);
    }
  },
  async saveAfRetenu(context: ActionContext<AfRetenusState, any>, payload: { ChoixAnnee: string; Af: string }) {
    const response = await AfRetenuAPI.saveAfRetenu(payload);

    //if (response.status !== 201) throw new Error);
  },
};
