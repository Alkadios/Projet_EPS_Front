import { computed } from 'vue';
import { useStore } from 'vuex';
import { AF } from '@/models';

export default function AfService() {
  const store = useStore();

  const afs = computed((): AF[] => {
    return store.getters['AfModule/getAfs'];
  });
  async function fetchAllAfs() {
    await store.dispatch('AfModule/fetchAllAfs');
  }

  return {
    afs,
    fetchAllAfs,
  };
}
