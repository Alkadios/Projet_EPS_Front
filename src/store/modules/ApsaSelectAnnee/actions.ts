import { ActionContext } from 'vuex';
import ApsaSelectAnneeAPI from '@/api/ApsaSelectAnnee';
import ApsaSelectAnneeState from './stateInterface';
import { APSA } from '@/models';

export default {
  async fetchAllApsaSelectAnneeByAnnee(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: { idAnnee: number }
  ) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnneeByAnnee(payload.idAnnee);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setApsaSelectAnneeByAnnee', response.data['hydra:member']);
    else {
      context.commit('setApsaSelectAnneeByAnnee', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchAllApsaSelectAnneeByAnneeAndClasse(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: { idAnnee: number; idClasse: number }
  ) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnneeByAnneeAndClasse(
      payload.idAnnee,
      payload.idClasse
    );
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setApsaSelectAnneeByAnneeAndClasse', response.data['hydra:member']);
    else {
      context.commit('setApsaSelectAnneeByAnneeAndClasse', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: { idApsa: number; idAnnee: number; idEtablissment: number }
  ) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee(
      payload.idAnnee,
      payload.idEtablissment,
      payload.idApsa
    );
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setApsaSelectAnneeByApsaAndEtablissmenetAndAnnee', response.data['hydra:member']);
    else {
      context.commit('setApsaSelectAnneeByApsaAndEtablissmenetAndAnnee', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchAllApsaSelectAnneeByAnneeAndEtablissement(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: { idAnnee: number; idEtablissement: number }
  ) {
    const response = await ApsaSelectAnneeAPI.fetchAllApsaSelectAnneeByAnneeAndEtablissement(
      payload.idAnnee,
      payload.idEtablissement
    );
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setApsaSelectAnneeByAnneeAndEtablissement', response.data['hydra:member']);
    else {
      context.commit('setApsaSelectAnneeByAnneeAndEtablissement', []);
      //throw new Error(response.data.message);
    }
  },
  async saveApsaSelectAnnee(
    context: ActionContext<ApsaSelectAnneeState, any>,
    payload: {
      Ca: number;
      Apsa: number;
      Annee: number;
      Etablissement: number;
    }[]
  ) {
    const response = await ApsaSelectAnneeAPI.saveApsaSelectAnnee(payload);

    //if (response.status !== 201) throw new Error);
  },
};
