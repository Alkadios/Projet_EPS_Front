import { ActionContext } from 'vuex';
import ApsaSelectAnneeAPI from '@/api/ApsaSelectAnnee';
import ApsaSelectAnneeState from './stateInterface';
import { APSA } from '@/models';

export default {
  async fetchAllApsaSelectAnneeByAnnee(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: { idAnnee: number }
  ) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnneeByAnnee(payload.idAnnee);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setApsaSelectAnneeByAnnee', response.data['hydra:member']);
    else {
      context.commit('setApsaSelectAnneeByAnnee', []);
      //throw new Error(response.data.message);
    }
  },
  async saveApsaSelectAnnee(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: {
      Ca: number;
      Apsa: number;
      Annee: number;
    }[]
  ) {
    const response = await ApsaSelectAnneeAPI.saveApsaSelectAnnee(payload);

    //if (response.status !== 201) throw new Error);
  },
};
