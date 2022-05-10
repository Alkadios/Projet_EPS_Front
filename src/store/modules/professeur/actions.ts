import { ActionContext } from 'vuex';
import ProfesseurAPI from '@/api/ProfesseurAPI';
import ProfesseurState from './stateInterface';

export default {
  async fetchProfesseursByEtablissement(
    context: ActionContext<ProfesseurState, any>,
    payload: { idEtablissement: number }
  ) {
    const response = await ProfesseurAPI.fetchProfesseursByEtablissement(payload.idEtablissement);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setProfesseursByEtablissement', response.data['hydra:member']);
    else {
      context.commit('setProfesseursByEtablissement', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchProfById(context: ActionContext<ProfesseurState, any>, payload: { idProf: number }) {
    const response = await ProfesseurAPI.fetchProfById(payload.idProf);
    if (response.data) context.commit('setProfById', response.data);
    else {
      context.commit('setProfById', []);
      //throw new Error(response.data.message);
    }
  },

  async saveProfesseur(
    context: ActionContext<ProfesseurState, any>,
    payload: {
      email: string;
      roles: string;
      password: string;
      nom: string;
      prenom: string;
      telephone: string;
    }
  ) {
    const response = await ProfesseurAPI.saveProf(payload);
    if (response.status === 201) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },

  async deleteProf(context: ActionContext<ProfesseurState, any>, payload: { idProf: number }) {
    const response = await ProfesseurAPI.deleteProf(payload.idProf);
    if (response.status === 204) {
    }
  },

  async putProfesseursClasse(
    context: ActionContext<ProfesseurState, any>,
    payload: {
      idProf: number;
      classe: string[];
    }
  ) {
    const response = await ProfesseurAPI.putProfesseursClasse(payload.idProf, payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },

  async updateProf(
    context: ActionContext<ProfesseurState, any>,
    payload: {
      idProf: number;
      nom: string;
      prenom: string;
      telephone: string;
    }
  ) {
    const response = await ProfesseurAPI.updateProf(payload.idProf, payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
};
