import { ActionContext } from 'vuex';

import CritereAPI from '@/api/CritereAPI';
import CritereState from './stateInterface';
import { Critere } from '@/models';

export default {
  async fetchCriteres(context: ActionContext<CritereState, any>) {
    const response = await CritereAPI.fetchCriteres();
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setCriteres', response.data['hydra:member']);
    } else {
      context.commit('setCriteres', []);
      //throw new Error(response.data.message);
    }
  },
  async saveCritere(
    context: ActionContext<Critere, any>,
    payload: { titre: string; description: string; image: string; urlVideo: string; ApsaRetenu: string }
  ) {
    const response = await CritereAPI.saveCritere(payload);
    if (response.status === 201) {
      context.commit('setCriteres', response.data);
    }
  },
  async deleteCritere(context: ActionContext<CritereState, any>, payload: { idCritere: number }) {
    const response = await CritereAPI.deleteCritere(payload.idCritere);
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setCriteres', response.data['hydra:member']);
    } else {
      context.commit('setCriteres', []);
      //throw new Error(response.data.message);
    }
  },
};
