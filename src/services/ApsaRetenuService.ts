import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApsaRetenus } from '@/models';

export default function ApsaRetenuService() {
  const store = useStore();
  async function saveApsaRetenus(AfRetenu: string, SituationEvaluation: string, ApsaSelectAnnee: string) {
    await store.dispatch('ApsaRetenuModule/saveApsaRetenus', {
      AfRetenu,
      SituationEvaluation,
      ApsaSelectAnnee,
    });
  }
  return {
    saveApsaRetenus,
  };
}
