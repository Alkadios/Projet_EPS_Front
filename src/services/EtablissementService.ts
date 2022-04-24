import { computed } from 'vue';
import { useStore } from 'vuex';
import { Etablissement } from '@/models';


export default function EtablissementService() {
  const store = useStore();

  const etablissements = computed((): Etablissement[] => {
    return store.getters['Etablissement/getEtablissements'];
  });


  async function fetchAllEtablissements() {
    await store.dispatch('EtablissementModule/fetchAllEtablissements');
  }


  return {
    fetchAllEtablissements,
    etablissements
    
  };
}
