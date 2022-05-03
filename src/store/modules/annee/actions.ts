import { ActionContext } from 'vuex';
import AnneeAPI from '@/api/AnneeAPI';
import AnneeState from './stateInterface';

export default {
  async fetchAllAnnees(context: ActionContext<AnneeState, any>) {
    const response = await AnneeAPI.fetchAllAnnees();
    if (response.data['hydra:totalItems'] > 0) context.commit('setAnnees', response.data['hydra:member']);
    else {
      context.commit('setAnnees', []);
      //throw new Error(response.data.message);
    }
  },
  async fetchAnneeById(context: ActionContext<AnneeState, any>, idAnnee: number) {
    const response = await AnneeAPI.fetchAnneeById(idAnnee);
    if (response.status === 200) context.commit('setAnnee', response.data);
    else {
      context.commit('setAnnee', {});
      //throw new Error(response.data.message);
    }
  },
};
