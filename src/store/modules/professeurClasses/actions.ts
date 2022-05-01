import { ActionContext } from 'vuex';
import ProfesseurClasseAPI from '@/api/ProfesseurClasseAPI';
import ProfesseurClassesState from './stateInterface';

export default {
  async fetchAllProfesseurClasses(context: ActionContext<ProfesseurClassesState, any>) {
    const response = await ProfesseurClasseAPI.fetchAllProfesseurClasses();
    if (response.data['hydra:totalItems'] > 0) context.commit('setProfesseurClasses', response.data['hydra:member']);
    else {
      context.commit('setProfesseurClasses', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchClassesByProfesseur(
    context: ActionContext<ProfesseurClassesState, any>,
    payload: { idProfesseur: number }
  ) {
    const response = await ProfesseurClasseAPI.fetchClassesByProfesseur(payload.idProfesseur);
    if (response.data['hydra:totalItems'] > 0) context.commit('setClassesByProfesseur', response.data['hydra:member']);
    else {
      context.commit('setClassesByProfesseur', []);
      //throw new Error(response.data.message);
    }
  },
};
