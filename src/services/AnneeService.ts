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

  const annee = computed((): Annee => {
    return store.getters['AnneeModule/getAnnee'];
  });
  async function fetchAnneeById(idAnnee: number) {
    await store.dispatch('AnneeModule/fetchAnneeById', idAnnee);
  }

  return {
    annees,
    fetchAllAnnee,
    annee,
    fetchAnneeById,
  };
}
