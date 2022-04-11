import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApsaRetenu } from '@/models';

export default function ApsaRetenuervice() {
  const store = useStore();

  const apsaRetenu = computed((): ApsaRetenu => {
    return store.getters['ApsaRetenuModule/getApsaRetenu'];
  });

  const apsasRetenus = computed((): ApsaRetenu[] => {
    return store.getters['ApsaRetenuModule/getApsasRetenus'];
  });
  async function fetchAllApsaRetenu() {
    await store.dispatch('ApsaRetenuModule/fetchAllApsaRetenu');
  }

  async function saveApsaRetenu(AfRetenu: string, SituationEvaluation: string, ApsaSelectAnnee: string) {
    await store.dispatch('ApsaRetenuModule/saveApsaRetenu', {
      AfRetenu,
      SituationEvaluation,
      ApsaSelectAnnee,
    });
  }
  return {
    apsaRetenu,
    apsasRetenus,
    fetchAllApsaRetenu,
    saveApsaRetenu,
  };
}
