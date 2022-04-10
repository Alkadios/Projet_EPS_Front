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
  async function saveApsaSelectAnnee(
    payload: {
      Ca: number;
      Apsa: number;
      Annee: number;
    }[]
  ) {
    await store.dispatch('ApsaSelectAnneeModule/saveApsaSelectAnnee', payload);
  }
  return {
    apsaSelectAnneeByAnnee,
    fetchAllApsaSelectAnneeByAnnee,
    saveApsaSelectAnnee,
  };
}
