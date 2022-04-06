import { computed } from 'vue';
import { useStore } from 'vuex';
import { ChoixAnnee } from '@/models';

export default function ApsaSelectAnneeService() {
  const store = useStore();

  const choixAnnee = computed((): ChoixAnnee => {
    return store.getters['ChoixAnneeModule/getChoixAnnee'];
  });
  async function saveChoixAnnee(champApprentissage: string, Niveau: string, Annee: string) {
    await store.dispatch('ChoixAnneeModule/saveChoixAnnee', { champApprentissage, Niveau, Annee });
  }

  return {
    choixAnnee,
    saveChoixAnnee,
  };
}
