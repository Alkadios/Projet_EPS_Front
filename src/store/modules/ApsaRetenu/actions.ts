import { ActionContext } from 'vuex';
import ApsaRetenuAPI from '@/api/ApsaRetenuAPI';
import ApsaRetenuState from './stateInterface';
import { ApsaRetenu } from '@/models';

export default {
  async fetchAllApsaRetenu(context: ActionContext<ApsaRetenuState, any>) {
    const response = await ApsaRetenuAPI.fetchAllApsaRetenu();
    if (response.data['hydra:totalItems'] > 0) context.commit('setApsasRetenus', response.data['hydra:member']);
    else {
      context.commit('setApsasRetenus', []);
    }
  },
  async saveApsaRetenu(
    context: ActionContext<ApsaRetenuState, any>,
    payload: { AfRetenu: string; SituationEvaluation: string; ApsaSelectAnnee: string }
  ) {
    const response = await ApsaRetenuAPI.saveApsaRetenu(payload);

    console.log('saveApsaRetenu', response);
    if (response.status === 201) {
      context.commit('setApsaRetenu', response.data);
    }
  },
};
