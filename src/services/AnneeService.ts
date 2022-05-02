import { Annee } from '@/models';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function AnneeService() {
  const store = useStore();

  const annees = computed((): Annee[] => {
    return store.getters['AnneeModule/getAnnees'];
  });

  async function fetchAllAnnees() {
    await store.dispatch('AnneeModule/fetchAllAnnees');
  }

  return {
    fetchAllAnnees,
    annees,
  };
}
