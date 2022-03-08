import { ActionContext } from 'vuex';
import ChampApprentissageAPI from '@/api/ChampApprentissageAPI';
import ChampApprentissageState from './stateInterface';
import { APSA } from '@/models';

export default {
  async fetchChampsApprentissages(context: ActionContext<ChampApprentissageState, any>) {
    const response = await ChampApprentissageAPI.fetchChampsApprentissages();
    if (response.data['hydra:totalItems'] > 0) {
      // console.log('apsas', response.data['hydra:member']);
      // response.data['hydra:member'].forEach((ca: any) => {
      //   const apsas: APSA[] = [];
      //   ca.champsApprentissageApsas.forEach((caApsa: APSA) => apsas.push(caApsa));
      //   ca.Apsa = apsas;
      // });

      // response.data['hydra:member'].Apsas = apsas;
      context.commit('setChampsApprentissages', response.data['hydra:member']);
    } else {
      context.commit('setChampsApprentissages', []);
      //throw new Error(response.data.message);
    }
  },
};
