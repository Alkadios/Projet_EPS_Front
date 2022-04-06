import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApsaSelectAnnee } from '@/models';

export default function ApsaRetenuService() {
  const store = useStore();
  async function saveApsaRetenus(AfRetenu: string, SituationEvaluation: string, ApsaSelectAnnee: string) {
    await store.dispatch('ApsaSelectAnneeModule/saveApsaSelectAnnee', {
      AfRetenu,
      SituationEvaluation,
      ApsaSelectAnnee,
    });
  }
  return {
    saveApsaRetenus,
  };
}
