import { Eleve, Etablissement } from '@/models';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function EleveService() {
  const store = useStore();

  async function fetchEleveById(idEleve: number) {
    await store.dispatch('EleveModule/fetchEleveById', {
      idEleve: idEleve,
    });
  }

  const eleveByUser = computed((): Eleve => {
    return store.getters['EleveModule/getEleveByUser'];
  });

  async function fetchEleveByUser(idUser: number) {
    await store.dispatch('EleveModule/fetchEleveByUser', {
      idUser: idUser,
    });
  }

  async function fetchElevesByAnneeAndEtablissement(idEtablissement: number, idAnnee: number) {
    await store.dispatch('EleveModule/fetchElevesByAnneeAndEtablissement', {
      idEtablissement: idEtablissement,
      idAnnee: idAnnee,
    });
  }

  async function fetchElevesByEtablissement(idEtablissement: number) {
    await store.dispatch('EleveModule/fetchElevesByEtablissement', {
      idEtablissement: idEtablissement,
    });
  }

  const eleveById = computed((): Eleve => {
    return store.getters['EleveModule/getEleveById'];
  });

  async function deleteEleve(idEleve: number) {
    await store.dispatch('EleveModule/deleteEleve', {
      idEleve: idEleve,
    });
  }

  const eleves = computed((): Eleve[] => {
    return store.getters['EleveModule/getEleves'];
  });

  const elevesByEtablissement = computed((): Eleve[] => {
    return store.getters['EleveModule/getElevesByEtablissement'];
  });

  const elevesByAnneeAndEtablissement = computed((): Eleve[] => {
    return store.getters['EleveModule/getElevesByAnneeAndEtablissement'];
  });

  async function saveEleve(
    email: string,
    roles: string,
    password: string,
    nom: string,
    prenom: string,
    telephone: string,
    mailParent1: string,
    mailParent2: string,
    sexeEleve: string,
    etablissement: Etablissement,
    dateNaiss: Date
  ) {
    await store.dispatch('EleveModule/saveEleve', {
      email,
      roles,
      password,
      nom,
      prenom,
      telephone,
      mailParent1,
      mailParent2,
      sexeEleve,
      etablissement,
      dateNaiss,
    });
  }

  async function updateEleve(
    idEleve: number,
    nom: string,
    prenom: string,
    telephone: string,
    mailParent1: string,
    mailParent2: string,
    sexeEleve: string
  ) {
    await store.dispatch('EleveModule/updateEleve', {
      idEleve: idEleve,
      nom,
      prenom,
      telephone,
      mailParent1,
      mailParent2,
      sexeEleve,
    });
  }

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

  const apsaEvaluateByEleve = computed((): any[] => {
    return store.getters['EleveModule/getApsaEvaluateByEleve'];
  });

  async function fetchAllApsaEvaluateByEleve(idEleve: number) {
    await store.dispatch('EleveModule/fetchAllApsaEvaluateByEleve', {
      idEleve: idEleve,
    });
  }

  return {
    saveEleve,
    fetchAllEleves,
    fetchEleveById,
    deleteEleve,
    updateEleve,
    eleveByUser,
    fetchEleveByUser,
    eleves,
    eleveById,
    elevesByClasse,
    elevesByAnneeAndEtablissement,
    elevesByEtablissement,
    fetchElevesByClasse,
    fetchElevesByAnneeAndEtablissement,
    apsaEvaluateByEleve,
    fetchAllApsaEvaluateByEleve,
    fetchElevesByEtablissement,
  };
}
