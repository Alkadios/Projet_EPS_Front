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

  const annee = computed((): Annee => {
    return store.getters['AnneeModule/getAnnee'];
  });
  async function fetchAnneeById(idAnnee: number) {
    await store.dispatch('AnneeModule/fetchAnneeById', idAnnee);
  }

  return {
    annees,
    fetchAllAnnees,
    annee,
    fetchAnneeById,
  };
}
