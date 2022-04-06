import { ActionContext } from 'vuex';
import ChoixAnneeAPI from '@/api/ChoixAnneeAPI';
import ChoixAnneeState from './stateInterface';

export default {
  async saveChoixAnnee(
    context: ActionContext<ChoixAnneeState, any>,
    payload: { champApprentissage: string; Niveau: string; Annee: string }
  ) {
    const response = await ChoixAnneeAPI.saveChoixAnnee(payload);
    if (response.status === 201) {
      context.commit('setChoixAnnee', response.data);
    } else {
      context.commit('setChoixAnnee', {});
    }
    //if (response.status !== 201) throw new Error);
  },
};
