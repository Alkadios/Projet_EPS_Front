import { ActionContext } from 'vuex';

import ChampApprentissageAPI from '@/api/ChampApprentissageAPI';
import ChampApprentissageState from './stateInterface';
import { APSA } from '@/models';

export default {
  async fetchChampsApprentissages(context: ActionContext<ChampApprentissageState, any>) {
    const response = await ChampApprentissageAPI.fetchChampsApprentissages();
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setChampsApprentissages', response.data['hydra:member']);
    } else {
      context.commit('setChampsApprentissages', []);
      //throw new Error(response.data.message);
    }
  },
  async saveApsaInCa(context: ActionContext<ChampApprentissageState, any>, payload: { idCa: number; apsas: APSA[] }) {
    const response = await ChampApprentissageAPI.saveApsaInCa(payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
};
