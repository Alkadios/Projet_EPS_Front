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
    id: string,
    libelle: string,
    description: string,
    image: string,
    urlVideo: string,
    critere: string
  ) {
    await store.dispatch('IndicateurModule/saveIndicateur', { id, libelle, description, image, urlVideo, critere });
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
