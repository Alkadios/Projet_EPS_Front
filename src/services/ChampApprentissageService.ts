import { computed } from 'vue';
import { useStore } from 'vuex';
import { ChampApprentissage } from '@/models';

export default function ChampApprentissageService() {
  const store = useStore();

  const champsApprentissages = computed((): ChampApprentissage[] => {
    return store.getters['ChampApprentissageModule/getChampsApprentissages'];
  });
  async function fetchChampsApprentissages() {
    await store.dispatch('ChampApprentissageModule/fetchChampsApprentissages');
  }

  return {
    champsApprentissages,
    fetchChampsApprentissages,
  };
}
