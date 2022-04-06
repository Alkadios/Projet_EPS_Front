import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApsaSelectAnnee } from '@/models';

export default function ApsaSelectAnneeService() {
  const store = useStore();

  const apsaSelectAnneeByAnnee = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectAnneeByAnnee'];
  });
  async function fetchAllApsaSelectAnneeByAnnee(idAnnee: number) {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnneeByAnnee', { idAnnee });
  }
  async function saveApsaSelectAnnee(Ca: string, Apsa: string, Annee: string) {
    await store.dispatch('ApsaSelectAnneeModule/saveApsaSelectAnnee', { Ca, Apsa, Annee });
  }
  return {
    apsaSelectAnneeByAnnee,
    fetchAllApsaSelectAnneeByAnnee,
    saveApsaSelectAnnee,
  };
}
