import { ActionContext } from 'vuex';
import AnneeAPI from '@/api/AnneeAPI';
import NiveauScolaireState from './stateInterface';
import NiveauScolaireAPI from '@/api/NiveauScolaireAPI';


export default {
  async fetchAllNiveauxScolaires(context: ActionContext<NiveauScolaireState, any>) {
    const response = await NiveauScolaireAPI.fetchAllNiveauxScolaires();
    if (response.data['hydra:totalItems'] > 0) context.commit('setNiveauxScolaires', response.data['hydra:member']);
    else {
      context.commit('setNiveauxScolaires', []);
      //throw new Error(response.data.message);
    }
  },


};
