import { ActionContext } from 'vuex';
import EleveState from './stateInterface';
import { Eleve, Etablissement } from '@/models';
import EleveAPI from '@/api/EleveAPI';
import { ref } from 'vue';

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

  async fetchEleveByUser(context: ActionContext<EleveState, any>, payload: { idUser: number }) {
    const response = await EleveAPI.fetchEleveByUser(payload.idUser);
    if (response.data) context.commit('setEleveByUser', response.data['hydra:member'][0]);
    else {
      context.commit('setEleveByUser', []);
      //throw new Error(response.data.message);
    }
  },

  async fetchElevesByAnneeAndEtablissement(
    context: ActionContext<EleveState, any>,
    payload: { idEtablissement: number; idAnnee: number }
  ) {
    const response = await EleveAPI.fetchElevesByAnneeAndEtablissement(payload.idEtablissement, payload.idAnnee);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setElevesByAnneeAndEtablissement', response.data['hydra:member']);
    else {
      context.commit('setEleves', []);
      //throw new Error(response.data.message);
    }
  },

  async deleteEleve(context: ActionContext<EleveState, any>, payload: { idEleve: number }) {
    const response = await EleveAPI.deleteEleve(payload.idEleve);
    if (response.status === 204) {
      const elevesByAnneeAndEtablissement = context.getters.getElevesByAnneeAndEtablissement;
      context.commit(
        'setElevesByAnneeAndEtablissement',
        elevesByAnneeAndEtablissement.filter((e: Eleve) => e.id != payload.idEleve)
      );
    }
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
      nom: string;
      prenom: string;
      telephone: string;
      mailParent1: string;
      mailParent2: string;
      sexeEleve: string;
    }
  ) {
    const response = await EleveAPI.updateEleve(payload);
    if (response.status === 200) {
      context.commit('setEleveById', response.data);
      const elevesByAnneeAndEtablissement = ref<Eleve[]>(context.getters.getElevesByAnneeAndEtablissement);
      const indexEleve = elevesByAnneeAndEtablissement.value.findIndex((e) => e.id == payload.idEleve);
      elevesByAnneeAndEtablissement.value[indexEleve] = response.data;
      context.commit('setElevesByAnneeAndEtablissement', elevesByAnneeAndEtablissement.value);
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
  async fetchAllApsaEvaluateByEleve(context: ActionContext<EleveState, any>, payload: { idEleve: number }) {
    const response = await EleveAPI.fetchAllApsaEvaluateByEleve(payload.idEleve);
    if (response.status === 200) {
      context.commit('setApsaEvaluateByEleve', response.data);
    } else {
      context.commit('setApsaEvaluateByEleve', []);
      //throw new Error(response.data.message);
    }
  },
};
