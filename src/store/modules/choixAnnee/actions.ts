import { ActionContext } from 'vuex';
import ChoixAnneeAPI from '@/api/ChoixAnneeAPI';
import ChoixAnneeState from './stateInterface';

export default {
  async saveChoixAnnee(
    context: ActionContext<ChoixAnneeState, any>,
    payload: { champApprentissage: string; Niveau: string; Annee: string; etablissement: string }
  ) {
    const response = await ChoixAnneeAPI.saveChoixAnnee(payload);
    if (response.status === 201) {
      context.commit('setChoixAnnee', response.data);
    } else {
      context.commit('setChoixAnnee', {});
    }
    //if (response.status !== 201) throw new Error);
  },
  async saveAfRetenuInChoixAnnee(
    _: ActionContext<ChoixAnneeState, any>,
    payload: { idChoixAnnee: number; afs: { Af: number }[] }
  ) {
    const response = await ChoixAnneeAPI.saveAfRetenuInChoixAnnee(payload);
    //if (response.status !== 201) throw new Error);
  },
  async fetchAllChoixAnneeByAnneeAndEtablissement(
    context: ActionContext<ChoixAnneeState, any>,
    payload: { idAnnee: number; idEtablissement: number }
  ) {
    const response = await ChoixAnneeAPI.fetchAllChoixAnneeByAnneeAndEtablissement(
      payload.idAnnee,
      payload.idEtablissement
    );
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setChoixAnneeByAnneeAndEtablissement', response.data['hydra:member']);
    } else {
      context.commit('setChoixAnneeByAnneeAndEtablissement', []);
    }
    //if (response.status !== 201) throw new Error);
  },
};
