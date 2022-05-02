import { ActionContext } from 'vuex';
import AnneeState from './stateInterface';
import { Annee } from '@/models';
import AnneeAPI from '@/api/AnneeAPI';


export default {
  async fetchAllAnnees(context: ActionContext<AnneeState, any>) {
    const response = await AnneeAPI.fetchAllAnnees();
    if (response.data['hydra:totalItems'] > 0) context.commit('setAnnees', response.data['hydra:member']);
    else {
      context.commit('setAnnees', []);
      //throw new Error(response.data.message);
    }
  },


};
