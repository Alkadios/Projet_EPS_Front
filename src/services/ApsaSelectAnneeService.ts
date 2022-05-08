import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApsaSelectAnnee } from '@/models';

export default function ApsaSelectAnneeService() {
  const store = useStore();

  const apsaSelectAnneeByAnnee = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectAnneeByAnnee'];
  });
  async function fetchAllApsaSelectAnneeByAnnee(idAnnee: number) {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnneeByAnnee', { idAnnee });
  }

  const apsaSelectAnneeByAnneeAndClasse = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectAnneeByAnneeAndClasse'];
  });
  async function fetchAllApsaSelectAnneeByAnneeAndClasse(idAnnee: number, idClasse: number) {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnneeByAnneeAndClasse', { idAnnee, idClasse });
  }

  const apsaSelectAnneeByApsaAndEtablissmenetAndAnnee = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectAnneeByApsaAndEtablissmenetAndAnnee'];
  });
  async function fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee(
    idAPSA: number,
    idAnnee: number,
    idEtablissement: number
  ) {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee', {
      idAPSA,
      idAnnee,
      idEtablissement,
    });
  }

  const apsaSelectAnneeByAnneeAndEtablissement = computed((): ApsaSelectAnnee[] => {
    return store.getters['ApsaSelectAnneeModule/getApsaSelectAnneeByAnneeAndEtablissement'];
  });
  async function fetchAllApsaSelectAnneeByAnneeAndEtablissement(idAnnee: number, idEtablissement: number) {
    await store.dispatch('ApsaSelectAnneeModule/fetchAllApsaSelectAnneeByAnneeAndEtablissement', {
      idAnnee,
      idEtablissement,
    });
  }

  async function saveApsaSelectAnnee(
    payload: {
      Ca: number;
      Apsa: number;
      Annee: number;
    }[]
  ) {
    await store.dispatch('ApsaSelectAnneeModule/saveApsaSelectAnnee', payload);
  }
  return {
    apsaSelectAnneeByAnnee,
    fetchAllApsaSelectAnneeByAnnee,
    apsaSelectAnneeByAnneeAndClasse,
    fetchAllApsaSelectAnneeByAnneeAndClasse,
    saveApsaSelectAnnee,
    fetchAllApsaSelectAnneeByAnneeAndEtablissement,
    apsaSelectAnneeByAnneeAndEtablissement,
    apsaSelectAnneeByApsaAndEtablissmenetAndAnnee,
    fetchAllApsaSelectAnneeByApsaAndEtablissmenetAndAnnee,
  };
}
