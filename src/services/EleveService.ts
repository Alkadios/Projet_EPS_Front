import { Eleve, Etablissement } from '@/models';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function EleveService() {
  const store = useStore();

  async function fetchAllEleves() {
    await store.dispatch('EleveModule/fetchAllEleves');
  }

  async function fetchEleveById(idEleve: number) {
    await store.dispatch('EleveModule/fetchEleveById', {
      idEleve: idEleve,
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
    etablissement: Etablissement
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
    });
  }

  async function updateEleve(
    idEleve: number,
    nom: string,
    prenom: string,
    telephone: string,
    mailParent1: string,
    mailParent2: string,
    sexeEleve: string,
    etablissement: Etablissement
  ) {
    await store.dispatch('EleveModule/updateEleve', {
      idEleve: idEleve,
      nom,
      prenom,
      telephone,
      mailParent1,
      mailParent2,
      sexeEleve,
      etablissement,
    });
  }

  return {
    saveEleve,
    fetchAllEleves,
    fetchEleveById,
    deleteEleve,
    updateEleve,
    eleves,
    eleveById,
  };
}
