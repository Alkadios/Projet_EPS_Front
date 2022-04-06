import { ActionContext } from 'vuex';
import ApsaSelectAnneeAPI from '@/api/ApsaSelectAnnee';
import ApsaSelectAnneeState from './stateInterface';
import { APSA } from '@/models';

export default {
  async fetchAllApsaSelectAnneeByAnnee(context: ActionContext<ApsaSelectAnneeState, any>, payload: { idAnne: number }) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnneeByAnnee(payload.idAnne);
    if (response.data['hydra:totalItems'] > 0) context.commit('setApsaSelect', response.data['hydra:member']);
    else {
      context.commit('setApsaSelect', []);
      //throw new Error(response.data.message);
    }
  },
  async saveApsaSelectAnnee(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: { Ca: string; Apsa: string; Annee: string }
  ) {
    const response = await ApsaSelectAnneeAPI.saveApsaSelectAnnee(payload);

    //if (response.status !== 201) throw new Error);
  },
};
