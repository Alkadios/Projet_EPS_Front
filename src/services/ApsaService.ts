import { computed } from 'vue';
import { useStore } from 'vuex';
import { APSA } from '@/models';

export default function ChampApprentissageService() {
  const store = useStore();

  const apsas = computed((): APSA[] => {
    return store.getters['ApsaModule/getApsas'];
  });
  async function fetchAllApsa() {
    await store.dispatch('ApsaModule/fetchAllApsa');
  }

  return {
    apsas,
    fetchAllApsa,
  };
}
