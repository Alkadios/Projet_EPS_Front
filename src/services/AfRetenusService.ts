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

  const afRetenuByAnneeAndNiveauScolaire = computed((): AfRetenus[] => {
    return store.getters['AfRetenusModule/getAfRetenuByAnneeAndNiveauScolaire'];
  });
  async function fetchAllAfRetenuByAnneeAndNiveauScolaire(idAnnee: number, idNiveauScolaire: number) {
    await store.dispatch('AfRetenusModule/fetchAllAfRetenuByAnneeAndNiveauScolaire', {
      idAnnee: idAnnee,
      idNiveauScolaire: idNiveauScolaire,
    });
  }
  async function saveAfRetenu(ChoixAnnee: string, Af: string) {
    await store.dispatch('AfRetenusModule/saveAfRetenu', { ChoixAnnee, Af });
  }

  return {
    afRetenus,
    fetchAllAfRetenus,
    afRetenuByAnneeAndNiveauScolaire,
    fetchAllAfRetenuByAnneeAndNiveauScolaire,
    saveAfRetenu,
  };
}
