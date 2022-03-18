import { computed } from 'vue';
import { useStore } from 'vuex';
import { APSA, ApsaSelectAnnee } from '@/models';

export default function ApsaSelectAnnee() {
  const store = useStore();

  const apsaSelectsAnnee = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectsAnnee'];
  });
  async function fetchAllApsaSelectAnnee() {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnnee');
  }
  async function saveApsaSelectAnnee(listeApsa: APSA[]) {
    await store.dispatch('ApsaSelectAnneeModule/saveApsaSelectAnnee', { listeApsa });
  }

  return {
    apsaSelectsAnnee,
    fetchAllApsaSelectAnnee,
    saveApsaSelectAnnee,
  };
}
