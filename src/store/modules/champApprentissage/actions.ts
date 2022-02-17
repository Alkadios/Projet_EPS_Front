import { ActionContext } from 'vuex';
import ChampApprentissageAPI from '@/api/ChampApprentissageAPI';
import ChampApprentissageState from './stateInterface';
import { Utilisateur } from '@/models';
import jwtDecode from 'jwt-decode';

export default {
  async fetchChampsApprentissages(context: ActionContext<ChampApprentissageState, any>) {
    const response = await ChampApprentissageAPI.fetchChampsApprentissages();
    if (response.data['hydra:totalItems'] > 0) context.commit('setChampsApprentissages', response.data['hydra:member']);
    else {
      context.commit('setChampsApprentissages', []);
      //throw new Error(response.data.message);
    }
  },
};
