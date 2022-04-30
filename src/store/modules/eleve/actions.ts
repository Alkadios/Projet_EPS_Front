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

  async fetchEleveById(context: ActionContext<EleveState, any>, payload: { idEleve: number}) {
    const response = await EleveAPI.fetchEleveById(payload.idEleve);
    if (response.data) context.commit('setEleveById', response.data);
    else {
      context.commit('setEleveById', []);
      //throw new Error(response.data.message);
    }
  },

  async deleteEleve(context: ActionContext<EleveState, any>, payload: { idEleve: number}) {
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
    const response = await EleveAPI.updateEleve(payload.idEleve,payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
};
