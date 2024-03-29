import { ActionContext } from 'vuex';
import ClasseAPI from '@/api/ClasseAPI';
import ClasseState from './stateInterface';
import { ref } from 'vue';
import { Classe, Eleve } from '@/models';

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
      const classesByAnnee = context.getters.getClassesByAnnee;
      context.commit(
        'setClassesByAnnee',
        classesByAnnee.filter((c: Classe) => c.id != payload.idClasse)
      );
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
      context.commit('setClassesById', response.data);
      const classe: Classe = response.data;
      const classes = ref<Classe[]>(context.getters.getClassesByAnneeAndEtablissement);
      classes.value.find((c) => c.id === classe.id)!.eleves = classe.eleves;

      // const indexEleve = elevesByClasse.value.findIndex((c) => c.classe.find((cl) => payload.idClasse === cl.id));
      // elevesByClasse.value[indexEleve] = response.data;
      context.commit('setClassesByAnneeAndEtablissement', classes.value);
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
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

  async fetchClasseByAnneeAndEtablissement(
    context: ActionContext<ClasseState, any>,
    payload: { idAnnee: number; idEtablissement: number }
  ) {
    const response = await ClasseAPI.fetchClasseByAnneeAndEtablissement(payload.idAnnee, payload.idEtablissement);
    if (response.data['hydra:totalItems'] > 0)
      context.commit('setClassesByAnneeAndEtablissement', response.data['hydra:member']);
    else {
      context.commit('setClassesByAnneeAndEtablissement', []);
      //throw new Error(response.data.message);
    }
  },
};
