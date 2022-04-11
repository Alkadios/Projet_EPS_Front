import { computed } from 'vue';
import { useStore } from 'vuex';
import { ChampApprentissage, APSA } from '@/models';

export default function ChampApprentissageService() {
  const store = useStore();

  const champsApprentissages = computed((): ChampApprentissage[] => {
    return store.getters['ChampApprentissageModule/getChampsApprentissages'];
  });
  async function fetchChampsApprentissages() {
    await store.dispatch('ChampApprentissageModule/fetchChampsApprentissages');
  }
  async function saveApsaInCa(idCa: number, apsas: APSA[]) {
    await store.dispatch('ChampApprentissageModule/saveApsaInCa', { idCa, apsas });
  }

  return {
    champsApprentissages,
    fetchChampsApprentissages,
    saveApsaInCa,
  };
}
