import { ActionContext } from 'vuex';
import ApsaSelectAnneeAPI from '@/api/ApsaSelectAnnee';
import ApsaSelectAnneeState from './stateInterface';
import { APSA } from '@/models';

export default {
  async fetchAllApsaSelectAnnee(context: ActionContext<ApsaSelectAnneeState, any>) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnnee();
    if (response.data['hydra:totalItems'] > 0) context.commit('setApsaSelect', response.data['hydra:member']);
    else {
      context.commit('setApsaSelect', []);
      //throw new Error(response.data.message);
    }
  },
  async saveApsaSelectAnnee(context: ActionContext<ApsaSelectAnneeState, any>, payload: { listeApsa: APSA[] }) {
    const response = await ApsaSelectAnneeAPI.saveApsaSelectAnnee(payload.listeApsa);
    //if (!response.data.successful) throw new Error);
  },
};
