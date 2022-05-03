import { computed } from 'vue';
import { useStore } from 'vuex';
import { Eleve } from '@/models';

export default function EleveService() {
  const store = useStore();

  const eleves = computed((): Eleve[] => {
    return store.getters['EleveModule/getEleves'];
  });

  async function fetchAllEleves() {
    await store.dispatch('EleveModule/fetchAllEleves');
  }

  const elevesByClasse = computed((): Eleve[] => {
    return store.getters['EleveModule/getElevesByClasse'];
  });
  async function fetchElevesByClasse(idClasse: number) {
    await store.dispatch('EleveModule/fetchElevesByClasse', {
      idClasse: idClasse,
    });
  }

  return {
    eleves,
    fetchAllEleves,
    elevesByClasse,
    fetchElevesByClasse,
  };
}
