import { computed } from 'vue';
import { useStore } from 'vuex';
import { AfRetenus } from '@/models';

export default function AfService() {
  const store = useStore();

  const afRetenus = computed((): AfRetenus[] => {
    return store.getters['AfRetenusModule/getAfRetenus'];
  });
  async function fetchAllAfRetenus() {
    await store.dispatch('AfRetenusModule/fetchAllAfRetenus');
  }

  return {
    afRetenus,
    fetchAllAfRetenus,
  };
}
