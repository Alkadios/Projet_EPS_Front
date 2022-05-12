import { ActionContext } from 'vuex';
import ProfesseurAPI from '@/api/ProfesseurAPI';
import ProfesseurState from './stateInterface';
import { Classe, Professeur } from '@/models';
import { ref } from 'vue';

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

  async fetchProfByRoles(context: ActionContext<ProfesseurState, any>, payload: { roles: string }) {
    const response = await ProfesseurAPI.fetchProfByRoles(payload.roles);
    if (response.data) context.commit('setProfByRoles', response.data['hydra:member']);
    else {
      context.commit('setProfByRoles', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchProfByUser(context: ActionContext<ProfesseurState, any>, payload: { idUser: number }) {
    const response = await ProfesseurAPI.fetchProfByUser(payload.idUser);
    if (response.data) context.commit('setProfByUser', response.data);
    else {
      context.commit('setProfByUser', []);
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
      etablissements: string;
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
      context.commit('setProfById', response.data);
      const professeursByEtablissement = ref<Professeur[]>(context.getters.getProfesseursByEtablissement);
      const indexProfesseur = professeursByEtablissement.value.findIndex((p) => p.id == payload.idProf);
      professeursByEtablissement.value[indexProfesseur] = response.data;
      context.commit('setProfesseursByEtablissement', professeursByEtablissement.value);
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },

  async fetchAllProfs(context: ActionContext<ProfesseurState, any>) {
    const response = await ProfesseurAPI.fetchAllProfs();
    if (response.data['hydra:totalItems'] > 0) context.commit('setProfesseurs', response.data['hydra:member']);
    else {
      context.commit('setProfesseurs', []);
      //throw new Error(response.data.message);
    }
  },
};
