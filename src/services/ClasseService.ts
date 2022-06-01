import { computed } from 'vue';
import { useStore } from 'vuex';
import { Classe } from '@/models';

export default function ClasseService() {
  const store = useStore();

  const classes = computed((): Classe[] => {
    return store.getters['ClasseModule/getClasses'];
  });

  async function fetchAllClasses() {
    await store.dispatch('ClasseModule/fetchAllClasses');
  }

  const classesByAnnee = computed((): Classe[] => {
    return store.getters['ClasseModule/getClassesByAnnee'];
  });

  const classesById = computed((): Classe => {
    return store.getters['ClasseModule/getClasseById'];
  });

  const classesByAnneeAndEtablissement = computed((): Classe[] => {
    return store.getters['ClasseModule/getClassesByAnneeAndEtablissement'];
  });

  async function fetchClasseByAnnee(idAnnee: number) {
    await store.dispatch('ClasseModule/fetchClasseByAnnee', {
      idAnnee: idAnnee,
    });
  }

  async function fetchClasseByAnneeAndEtablissement(idAnnee: number, idEtablissement: number) {
    await store.dispatch('ClasseModule/fetchClasseByAnneeAndEtablissement', {
      idAnnee: idAnnee,
      idEtablissement: idEtablissement,
    });
  }

  async function addElevesInClasse(idClasse: number, eleves: string[]) {
    await store.dispatch('ClasseModule/addElevesInClasse', {
      idClasse: idClasse,
      eleves,
    });
  }

  async function saveClasse(libelleClasse: string, NiveauScolaire: string, Annee: string, etablissement: string) {
    await store.dispatch('ClasseModule/saveClasse', {
      libelleClasse,
      NiveauScolaire,
      Annee,
      etablissement,
    });
  }

  async function fetchClasseById(idClasse: number) {
    await store.dispatch('ClasseModule/fetchClasseById', {
      idClasse: idClasse,
    });
  }

  async function deleteClasse(idClasse: number) {
    await store.dispatch('ClasseModule/deleteClasse', {
      idClasse: idClasse,
    });
  }

  const classesByAnneeAndProfesseur = computed((): Classe[] => {
    return store.getters['ClasseModule/getClassesByAnneeAndProfesseur'];
  });

  async function fetchClasseByAnneeAndProf(idAnnee: number, idProfesseur: number) {
    await store.dispatch('ClasseModule/fetchClasseByAnneeAndProf', {
      idAnnee: idAnnee,
      idProfesseur: idProfesseur,
    });
  }

  return {
    fetchAllClasses,
    fetchClasseByAnnee,
    fetchClasseById,
    classes,
    classesByAnnee,
    classesById,
    addElevesInClasse,
    saveClasse,
    deleteClasse,
    classesByAnneeAndProfesseur,
    classesByAnneeAndEtablissement,
    fetchClasseByAnneeAndProf,
    fetchClasseByAnneeAndEtablissement,
  };
}
