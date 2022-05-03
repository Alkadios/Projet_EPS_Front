import { ActionContext } from 'vuex';
import ClasseAPI from '@/api/ClasseAPI';
import ClasseState from './stateInterface';
import { Eleve } from '@/models/Eleve';
import { Annee, Classe, Etablissement, NiveauScolaire } from '@/models';
import { ref } from 'vue';

export default {
  async fetchAllClasses(context: ActionContext<ClasseState, any>) {
    const response = await ClasseAPI.fetchAllClasses();
    if (response.data['hydra:totalItems'] > 0) context.commit('setClasses', response.data['hydra:member']);
    else {
      context.commit('setClasses', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchClasseByAnnee(context: ActionContext<ClasseState, any>, payload: { idAnnee: number }) {
    const response = await ClasseAPI.fetchClasseByAnnee(payload.idAnnee);
    if (response.data['hydra:totalItems'] > 0) context.commit('setClassesByAnnee', response.data['hydra:member']);
    else {
      context.commit('setClassesByAnnee', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchClasseById(context: ActionContext<ClasseState, any>, payload: { idClasse: number }) {
    const response = await ClasseAPI.fetchClasseById(payload.idClasse);
    if (response.data) context.commit('setClassesById', response.data);
    else {
      context.commit('setClassesById', []);
      //throw new Error(response.data.message);
    }
  },

  async saveClasse(
    context: ActionContext<ClasseState, any>,
    payload: {
      libelleClasse: string;
      NiveauScolaire: string;
      Annee: string;
      etablissement: string;
    }
  ) {
    const response = await ClasseAPI.saveClasse(payload);
    if (response.status === 201) {
    }
  },

  async deleteClasse(
    context: ActionContext<ClasseState, any>,
    payload: {
      idClasse: number;
    }
  ) {
    const response = await ClasseAPI.deleteClasse(payload.idClasse);
    if (response.status === 204) {
    } else {
    }
    //if (response.status !== 201) throw new Error);
  },

  async addElevesInClasse(
    context: ActionContext<ClasseState, any>,
    payload: {
      idClasse: number;
      eleves: string[];
    }
  ) {
    const response = await ClasseAPI.addElevesInClasse(payload.idClasse, payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
};
