import { computed } from 'vue';
import { useStore } from 'vuex';
import { Indicateur } from '@/models';

export default function IndicateurService() {
  const store = useStore();

  const indicateurs = computed((): Indicateur[] => {
    return store.getters['IndicateurModule/getIndicateurs'];
  });
  async function fetchIndicateurs() {
    await store.dispatch('IndicateurModule/fetchIndicateurs');
  }

  const indicateur = computed((): Indicateur => {
    return store.getters['IndicateurModule/getIndicateur'];
  });
  async function saveIndicateur(
    libelle: string,
    description: string,
    image: string,
    urlVideo: string,
    Critere: string
  ) {
    await store.dispatch('CritereModule/saveCritere', { libelle, description, image, urlVideo, Critere });
  }
  async function fetchIndicateurById(idIndicateur: number) {
    await store.dispatch('IndicateurModule/fetchIndicateurById', idIndicateur);
  }
  const indicateursByCritere = computed((): Indicateur[] => {
    return store.getters['IndicateurModule/getIndicateurByCritere'];
  });
  async function fetchIndicateursByCritere(idCritere: number) {
    await store.dispatch('IndicateurModule/fetchIndicateurByCritere', idCritere);
  }

  async function deleteIndicateur(idIndicateur: number) {
    await store.dispatch('IndicateurModule/deleteIndicateur');
  }
  return {
    indicateurs,
    fetchIndicateurs,
    indicateur,
    fetchIndicateurById,
    saveIndicateur,
    deleteIndicateur,
    fetchIndicateursByCritere,
    indicateursByCritere,
  };
}
