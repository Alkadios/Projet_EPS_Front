import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApsaRetenu } from '@/models';

export default function ApsaRetenuService() {
  const store = useStore();

  const apsaRetenu = computed((): ApsaRetenu => {
    return store.getters['ApsaRetenuModule/getApsaRetenu'];
  });

  const apsasRetenus = computed((): ApsaRetenu[] => {
    return store.getters['ApsaRetenuModule/getApsasRetenus'];
  });
  async function fetchAllApsaRetenu() {
    await store.dispatch('ApsaRetenuModule/fetchAllApsaRetenu');
  }
  async function fetchApsaRetenu(idApsaRetenu: number) {
    await store.dispatch('ApsaRetenuModule/fetchApsaRetenu', { idApsaRetenu: idApsaRetenu });
  }

  const apsasRetenusByEtablissementAndAnnee = computed((): ApsaRetenu[] => {
    return store.getters['ApsaRetenuModule/getApsasRetenusByEtablissementAndAnnee'];
  });

  async function fetchApsaRetenuByAnneeAndEtablissement(idAnnee: number, idEtablissement: number) {
    await store.dispatch('ApsaRetenuModule/fetchApsaRetenuByAnneeAndEtablissement', {
      idAnnee: idAnnee,
      idEtablissement: idEtablissement,
    });
  }
  async function saveApsaRetenu(AfRetenu: string, SituationEvaluation: string, ApsaSelectAnnee: string) {
    await store.dispatch('ApsaRetenuModule/saveApsaRetenu', {
      AfRetenu,
      SituationEvaluation,
      ApsaSelectAnnee,
    });
  }
  async function editApsaRetenu(id: number, AfRetenu: string, SituationEvaluation: string, ApsaSelectAnnee: string) {
    await store.dispatch('ApsaRetenuModule/editApsaRetenu', {
      id,
      AfRetenu,
      SituationEvaluation,
      ApsaSelectAnnee,
    });
  }
  return {
    apsaRetenu,
    apsasRetenus,
    apsasRetenusByEtablissementAndAnnee,
    fetchAllApsaRetenu,
    fetchApsaRetenu,
    saveApsaRetenu,
    editApsaRetenu,
    fetchApsaRetenuByAnneeAndEtablissement,
  };
}
