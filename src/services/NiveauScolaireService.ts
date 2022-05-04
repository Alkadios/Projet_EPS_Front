import { computed } from 'vue';
import { useStore } from 'vuex';
import { NiveauScolaire } from '@/models';

export default function NiveauScolaireService() {
  const store = useStore();

  const niveauxScolaires = computed((): NiveauScolaire[] => {
    return store.getters['NiveauScolaireModule/getNiveauxScolaires'];
  });

  async function fetchAllNiveauxScolaires() {
    await store.dispatch('NiveauScolaireModule/fetchAllNiveauxScolaires');
  }

  return {
    fetchAllNiveauxScolaires,
    niveauxScolaires,
  };
}
