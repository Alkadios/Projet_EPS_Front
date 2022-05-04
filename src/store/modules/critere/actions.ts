import { ActionContext } from 'vuex';
import { ref } from 'vue';
import CritereAPI from '@/api/CritereAPI';
import CritereState from './stateInterface';
import { Critere } from '@/models';

export default {
  async fetchCriteres(context: ActionContext<CritereState, any>) {
    const response = await CritereAPI.fetchCriteres();
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setCriteres', response.data['hydra:member']);
    } else {
      context.commit('setCriteres', []);
      //throw new Error(response.data.message);
    }
  },
  async fetchCritereById(context: ActionContext<CritereState, any>, idCritere: number) {
    const response = await CritereAPI.fetchCritereById(idCritere);
    if (response.status === 200) {
      context.commit('setCritere', response.data);
    } else {
      context.commit('setCritere', {});
      //throw new Error(response.data.message);
    }
  },
  async fetchCritereByApsaRetenu(context: ActionContext<CritereState, any>, idApsaRetenu: number) {
    const response = await CritereAPI.fetchCriteresByApsaRetenu(idApsaRetenu);
    if (response.status === 200) {
      context.commit('setCritere', response.data);
    } else {
      context.commit('setCritere', {});
      //throw new Error(response.data.message);
    }
  },
  async fetchCriteresByAnneeApsaRetenuAndAfRetenu(
    context: ActionContext<CritereState, any>,
    payload: { annee: number; idApsaRetenu: number; idAfRetenu: number }
  ) {
    const response = await CritereAPI.fetchCriteresByAnneeApsaRetenuAndAfRetenu(
      payload.annee,
      payload.idApsaRetenu,
      payload.idAfRetenu
    );
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setCriteresByAnneeApsaRetenuAndAfRetenu', response.data['hydra:member']);
    } else {
      context.commit('setCriteresByAnneeApsaRetenuAndAfRetenu', []);
      //throw new Error(response.data.message);
    }
  },
  async saveCritere(
    context: ActionContext<CritereState, any>,
    payload: { titre: string; description: string; image: string; urlVideo: string; ApsaRetenu: string }
  ) {
    const response = await CritereAPI.saveCritere(payload);
    if (response.status === 201) {
      context.commit('setCritere', response.data);
      //Ajout dans la liste critèresByApsaRetenu
      const criteresByApsaRetenu = ref<Critere[]>(context.getters.getCriteresByApsaRetenu);
      criteresByApsaRetenu.value.push(response.data);
      context.commit('setCriteresByApsaRetenu', criteresByApsaRetenu.value);
    }
  },
  async deleteCritere(context: ActionContext<CritereState, any>, payload: { idCritere: number }) {
    const response = await CritereAPI.deleteCritere(payload.idCritere);
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setCriteres', response.data['hydra:member']);
    } else {
      context.commit('setCriteres', []);
      //throw new Error(response.data.message);
    }
  },
  async editCritere(
    context: ActionContext<CritereState, any>,
    payload: { id: number; titre: string; description: string; image: string; urlVideo: string }
  ) {
    const response = await CritereAPI.editCritere(payload);
    if (response.status === 201) {
      context.commit('setCritere', response.data);
      //Ajout dans la liste critèresByApsaRetenu
      const criteresByApsaRetenu = ref<Critere[]>(context.getters.getCriteresByApsaRetenu);
      criteresByApsaRetenu.value.push(response.data);
      context.commit('setCriteresByApsaRetenu', criteresByApsaRetenu.value);
    }
  },
};
