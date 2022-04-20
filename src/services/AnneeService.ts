import { computed } from 'vue';
import { useStore } from 'vuex';
import { Annee } from '@/models';

export default function AnneeService() {
  const store = useStore();

  const annees = computed((): Annee[] => {
    return store.getters['AnneeModule/getAnnees'];
  });
  async function fetchAllAnnee() {
    await store.dispatch('AnneeModule/fetchAllAnnee');
  }

  return {
    annees,
    fetchAllAnnee,
  };
}
