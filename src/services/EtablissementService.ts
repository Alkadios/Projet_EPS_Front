import { computed } from 'vue';
import { useStore } from 'vuex';
import { Etablissement } from '@/models';

export default function EtablissementService() {
  const store = useStore();

  const etablissements = computed((): Etablissement[] => {
    return store.getters['EtablissementModule/getEtablissements'];
  });

  async function fetchAllEtablissements() {
    await store.dispatch('EtablissementModule/fetchAllEtablissements');
  }

  async function putEtablissementProfs(idEtablissement: number, Professeur: string[]) {
    await store.dispatch('EtablissementModule/putEtablissementProfs', {
      idEtablissement: idEtablissement,
      Professeur,
    });
  }

  return {
    fetchAllEtablissements,
    putEtablissementProfs,
    etablissements,
  };
}
