import { ActionContext } from 'vuex';
import ClasseAPI from '@/api/ClasseAPI';
import ClasseState from './stateInterface';

export default {
  async fetchAllClasses(context: ActionContext<ClasseState, any>) {
    const response = await ClasseAPI.fetchAllClasses();
    if (response.data['hydra:totalItems'] > 0) context.commit('setClasse', response.data['hydra:member']);
    else {
      context.commit('setClasse', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchClasseByAnneeAndProf(
    context: ActionContext<ClasseState, any>,
    payload: { idAnnee: number; idProfesseur: number }
  ) {
    const response = await ClasseAPI.fetchClasseByAnneeAndProf(payload.idAnnee, payload.idProfesseur);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setClassesByAnneeAndProfesseur', response.data['hydra:member']);
    else {
      context.commit('setClassesByAnneeAndProfesseur', []);
      //throw new Error(response.data.message);
    }
  },
};
