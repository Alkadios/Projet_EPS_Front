import { ActionContext } from 'vuex';
import ApsaRetenuAPI from '@/api/ApsaRetenuAPI';
import ApsaRetenuState from './stateInterface';
import { ApsaRetenu } from '@/models';

export default {
  async fetchAllApsaRetenus(context: ActionContext<ApsaRetenuState, any>) {
    const response = await ApsaRetenuAPI.fetchAllApsaRetenu();
    if (response.data['hydra:totalItems'] > 0) context.commit('setApsasRetenus', response.data['hydra:member']);
    else {
      context.commit('setApsasRetenus', []);
    }
  },
  async fetchApsaRetenu(context: ActionContext<ApsaRetenuState, any>, payload: { idApsaRetenu: number }) {
    const response = await ApsaRetenuAPI.fetchApsaRetenu(payload.idApsaRetenu);
    if (response.status === 200) context.commit('setApsaRetenu', response.data);
    else {
      context.commit('setApsaRetenu', {});
    }
  },
  async saveApsaRetenu(
    context: ActionContext<ApsaRetenuState, any>,
    payload: { AfRetenu: string; SituationEvaluation: string; ApsaSelectAnnee: string }
  ) {
    const response = await ApsaRetenuAPI.saveApsaRetenu(payload);
    if (response.status === 201) {
      context.commit('setApsaRetenu', response.data);
    }
  },
};
