import { Eleve, Etablissement, Professeur } from '@/models';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function ProfesseurService() {
  const store = useStore();

  async function fetchProfesseursByEtablissement(idEtablissement: number) {
    await store.dispatch('ProfesseurModule/fetchProfesseursByEtablissement', {
      idEtablissement: idEtablissement,
    });
  }

  const professeurByUser = computed((): Professeur => {
    return store.getters['ProfesseurModule/getProfByUser'];
  });

  async function fetchProfByUser(idUser: number) {
    await store.dispatch('ProfesseurModule/fetchProfByUser', {
      idUser: idUser,
    });
  }

  async function deleteProf(idProf: number) {
    await store.dispatch('ProfesseurModule/deleteProf', {
      idProf: idProf,
    });
  }

  async function fetchProfById(idProf: number) {
    await store.dispatch('ProfesseurModule/fetchProfById', {
      idProf: idProf,
    });
  }

  async function saveProfesseur(
    email: string,
    roles: string,
    password: string,
    nom: string,
    prenom: string,
    telephone: string
  ) {
    await store.dispatch('ProfesseurModule/saveProfesseur', {
      email,
      roles,
      password,
      nom,
      prenom,
      telephone,
    });
  }

  async function putProfesseursClasse(idProf: number, classe: string[]) {
    await store.dispatch('ProfesseurModule/putProfesseursClasse', {
      idProf: idProf,
      classe,
    });
  }

  async function updateProf(idProf: number, nom: string, prenom: string, telephone: string) {
    await store.dispatch('ProfesseurModule/updateProf', {
      idProf: idProf,
      nom,
      prenom,
      telephone,
    });
  }

  const professeurById = computed((): Professeur => {
    return store.getters['ProfesseurModule/getProfById'];
  });

  const professeursByEtablissement = computed((): Professeur[] => {
    return store.getters['ProfesseurModule/getProfesseursByEtablissement'];
  });

  return {
    fetchProfesseursByEtablissement,
    professeursByEtablissement,
    saveProfesseur,
    deleteProf,
    updateProf,
    fetchProfById,
    professeurById,
    putProfesseursClasse,
    professeurByUser,
    fetchProfByUser,
  };
}
