import { ActionContext } from 'vuex';
import EtablissementState from './stateInterface';
import EtablissementAPI from '@/api/EtablissementAPI';
import { Etablissement, Professeur } from '@/models';
import { ref } from 'vue';

export default {
  async fetchAllEtablissements(context: ActionContext<EtablissementState, any>) {
    const response = await EtablissementAPI.fetchAllEtablissements();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEtablissements', response.data['hydra:member']);
    else {
      context.commit('setEtablissements', []);
      //throw new Error(response.data.message);
    }
  },

  async putEtablissementProfs(
    context: ActionContext<EtablissementState, any>,
    payload: {
      idEtablissement: number;
      Professeur: string[];
    }
  ) {
    const response = await EtablissementAPI.putEtablissementProfs(payload.idEtablissement, payload);
    if (response.status === 200) {
      const etablissement: Etablissement = response.data;
      const etablissements = ref<Etablissement[]>(context.getters.getEtablissements);
      etablissements.value.find((p) => p.id === etablissement.id)!.Professeur = etablissement.Professeur;
      context.commit('setEtablissements', etablissements.value);
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
  async saveEtablissement(
    context: ActionContext<EtablissementState, any>,
    payload: {
      etablissement: Etablissement;
    }
  ) {
    const response = await EtablissementAPI.saveEtablissement(payload.etablissement);
    if (response.status === 200 || response.status === 201) {
      const etablissement: Etablissement = response.data;
      const etablissements = ref<Etablissement[]>(context.getters.getEtablissements);
      const indexEtablissement = etablissements.value.findIndex((p) => p.id === etablissement.id);
      if (indexEtablissement !== -1) {
        etablissements.value[indexEtablissement] = etablissement;
      } else {
        etablissements.value.push(etablissement);
      }
      context.commit('setEtablissements', etablissements.value);
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
  async deleteEtablissement(
    context: ActionContext<EtablissementState, any>,
    payload: {
      idEtablissement: number;
    }
  ) {
    const response = await EtablissementAPI.deleteEtablissement(payload.idEtablissement);
    if (response.status === 204) {
      const etablissements = context.getters.getEtablissements;
      context.commit(
        'setEtablissements',
        etablissements.filter((e: Etablissement) => e.id != payload.idEtablissement)
      );
    }
    //else throw new Error;
  },
};
