import { ActionContext } from 'vuex';
import ClasseAPI from '@/api/ClasseAPI';
import ClasseState from './stateInterface';

export default {
  async fetchAllClasses(context: ActionContext<ClasseState, any>) {
    const response = await ClasseAPI.fetchAllClasses();
    if (response.data['hydra:totalItems'] > 0) context.commit('setClasses', response.data['hydra:member']);
    else {
      context.commit('setClasses', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchClasseByAnnee(
    context: ActionContext<ClasseState, any>,
    payload: { idAnnee: number; idProfesseur: number }
  ) {
    const response = await ClasseAPI.fetchClasseByAnnee(payload.idAnnee);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setClassesByAnnee', response.data['hydra:member']);
    else {
      context.commit('setClassesByAnnee', []);
      //throw new Error(response.data.message);
    }
  },


};
