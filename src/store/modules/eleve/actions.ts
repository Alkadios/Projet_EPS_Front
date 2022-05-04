import { ActionContext } from 'vuex';
import EleveState from './stateInterface';
import { Etablissement } from '@/models';
import EleveAPI from '@/api/EleveAPI';

export default {
  async fetchAllEleves(context: ActionContext<EleveState, any>) {
    const response = await EleveAPI.fetchAllEleves();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEleves', response.data['hydra:member']);
    else {
      context.commit('setEleves', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchEleveById(context: ActionContext<EleveState, any>, payload: { idEleve: number }) {
    const response = await EleveAPI.fetchEleveById(payload.idEleve);
    if (response.data) context.commit('setEleveById', response.data);
    else {
      context.commit('setEleveById', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchElevesByAnneeAndEtablissement(
    context: ActionContext<EleveState, any>,
    payload: { idEtablissement: number }
  ) {
    const response = await EleveAPI.fetchElevesByAnneeAndEtablissement(payload.idEtablissement);
    if (response.data) context.commit('setElevesByAnneeAndEtablissement', response.data);
    else {
      context.commit('setElevesByAnneeAndEtablissement', []);
      //throw new Error(response.data.message);
    }
  },

  async deleteEleve(context: ActionContext<EleveState, any>, payload: { idEleve: number }) {
    await EleveAPI.deleteEleve(payload.idEleve);
  },

  async saveEleve(
    context: ActionContext<EleveState, any>,
    payload: {
      email: string;
      roles: string;
      password: string;
      nom: string;
      prenom: string;
      telephone: string;
      mailParent1: string;
      mailParent2: string;
      sexeEleve: string;
      etablissement: Etablissement;
    }
  ) {
    const response = await EleveAPI.saveEleve(payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },

  async updateEleve(
    context: ActionContext<EleveState, any>,
    payload: {
      idEleve: number;
      email: string;
      roles: string;
      password: string;
      nom: string;
      prenom: string;
      telephone: string;
      mailParent1: string;
      mailParent2: string;
      sexeEleve: string;
      etablissement: Etablissement;
    }
  ) {
    const response = await EleveAPI.updateEleve(payload.idEleve, payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
  async fetchElevesByClasse(context: ActionContext<EleveState, any>, payload: { idClasse: number }) {
    const response = await EleveAPI.fetchElevesByClasse(payload.idClasse);
    if (response.data['hydra:totalItems'] > 0) context.commit('setElevesByClasse', response.data['hydra:member']);
    else {
      context.commit('setElevesByClasse', []);
      //throw new Error(response.data.message);
    }
  },
};
