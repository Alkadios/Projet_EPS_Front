import { ActionContext } from 'vuex';
import EtablissementState from './stateInterface';
import EtablissementAPI from '@/api/EtablissementAPI';
import etablissement from '.';

export default {
  async fetchAllEtablissements(context: ActionContext<EtablissementState, any>) {
    const response = await EtablissementAPI.fetchAllEtablissements();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEtablissements', response.data['hydra:member']);
    else {
      context.commit('setEtablissements', []);
      //throw new Error(response.data.message);
    }
  },
};
