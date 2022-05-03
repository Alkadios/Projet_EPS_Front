import { ActionContext } from 'vuex';
import { ref } from 'vue';
import IndicateurAPI from '@/api/IndicateurApi';
import IndicateurState from './stateInterface';
import { Indicateur } from '@/models';

export default {
  async fetchIndicateurs(context: ActionContext<IndicateurState, any>) {
    const response = await IndicateurAPI.fetchIndicateurs();
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setIndicateurs', response.data['hydra:member']);
    } else {
      context.commit('setIndicateurs', []);
      //throw new Error(response.data.message);
    }
  },
  async fetchCritereById(context: ActionContext<IndicateurState, any>, idCritere: number) {
    const response = await IndicateurAPI.fetchIndicateurById(idCritere);
    if (response.status === 200) {
      context.commit('setIndicateur', response.data);
    } else {
      context.commit('setIndicateur', {});
      //throw new Error(response.data.message);
    }
  },
  async fetchIndicateurByCritere(context: ActionContext<IndicateurState, any>, idCritere: number) {
    const response = await IndicateurAPI.fetchIndicateursByCritere(idCritere);
    if (response.status === 200) {
      context.commit('setIndicateur', response.data);
    } else {
      context.commit('setIndicateur', {});
      //throw new Error(response.data.message);
    }
  },
  async saveIndicateur(
    context: ActionContext<IndicateurState, any>,
    payload: { libelle: string; description: string; image: string; urlVideo: string; color: string; Critere: string }
  ) {
    const response = await IndicateurAPI.saveIndicateur(payload);
    if (response.status === 201) {
      context.commit('setIndicateur', response.data);
      //Ajout dans la liste critèresByApsaRetenu
      const indicateursByCritere = ref<Indicateur[]>(context.getters.getIndicateurByCritere);
      indicateursByCritere.value.push(response.data);
      context.commit('setIndicateursByCritere', indicateursByCritere.value);
    }
  },
  async deleteIndicateur(context: ActionContext<IndicateurState, any>, payload: { idIndicateur: number }) {
    const response = await IndicateurAPI.deleteIndicateur(payload.idIndicateur);
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setIndicateur', response.data['hydra:member']);
    } else {
      context.commit('setIndicateur', []);
      //throw new Error(response.data.message);
    }
  },
  async editIndicateur(
    context: ActionContext<IndicateurState, any>,
    payload: { id: number; libelle: string; description: string; image: string; urlVideo: string; color: string }
  ) {
    const response = await IndicateurAPI.editIndicateur(payload);
    if (response.status === 201) {
      context.commit('setCritere', response.data);
      //Ajout dans la liste critèresByApsaRetenu
      const criteresByApsaRetenu = ref<Indicateur[]>(context.getters.getCriteresByApsaRetenu);
      criteresByApsaRetenu.value.push(response.data);
      context.commit('setCriteresByApsaRetenu', criteresByApsaRetenu.value);
    }
  },
};
