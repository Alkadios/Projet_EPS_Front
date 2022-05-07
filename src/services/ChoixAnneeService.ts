import { computed } from 'vue';
import { useStore } from 'vuex';
import { ChoixAnnee } from '@/models';

export default function ApsaSelectAnneeService() {
  const store = useStore();

  const choixAnnee = computed((): ChoixAnnee => {
    return store.getters['ChoixAnneeModule/getChoixAnnee'];
  });
  async function saveChoixAnnee(champApprentissage: string, Niveau: string, Annee: string, etablissement: string) {
    await store.dispatch('ChoixAnneeModule/saveChoixAnnee', { champApprentissage, Niveau, Annee, etablissement });
  }

  async function saveAfRetenuInChoixAnnee(idChoixAnnee: number, afs: { Af: number }[]) {
    await store.dispatch('ChoixAnneeModule/saveAfRetenuInChoixAnnee', { idChoixAnnee, afs });
  }

  const choixAnneeByAnneeAndEtablissement = computed((): ChoixAnnee[] => {
    return store.getters['ChoixAnneeModule/getChoixAnneeByAnneeAndEtablissement'];
  });
  async function fetchAllChoixAnneeByAnneeAndEtablissement(idAnnee: number, idEtablissement: number) {
    await store.dispatch('ChoixAnneeModule/fetchAllChoixAnneeByAnneeAndEtablissement', { idAnnee, idEtablissement });
  }

  return {
    choixAnnee,
    saveChoixAnnee,
    saveAfRetenuInChoixAnnee,
    choixAnneeByAnneeAndEtablissement,
    fetchAllChoixAnneeByAnneeAndEtablissement,
  };
}
