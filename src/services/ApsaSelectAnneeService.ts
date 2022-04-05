import { computed } from 'vue';
import { useStore } from 'vuex';
import { APSA, ApsaSelectAnnee } from '@/models';

export default function ApsaSelectAnnee() {
  const store = useStore();

  const apsaSelectsAnnee = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectsAnnee'];
  });
  async function fetchAllApsaSelectAnneeByAnnee(idAnnee: number) {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnneeByAnnee', { idAnnee });
  }
  async function saveApsaSelectAnnee(Ca: string, Apsa: string, Annee: string) {
    await store.dispatch('ApsaSelectAnneeModule/saveApsaSelectAnnee', { Ca, Apsa, Annee });
  }

  return {
    apsaSelectsAnnee,
    fetchAllApsaSelectAnneeByAnnee,
    saveApsaSelectAnnee,
  };
}
