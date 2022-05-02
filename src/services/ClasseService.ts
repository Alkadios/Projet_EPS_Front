import { Annee, Classe, Eleve, Etablissement, NiveauScolaire } from '@/models';
import { computed } from 'vue';
import { useStore } from 'vuex';

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

  async function fetchClasseByAnnee(idAnnee: number) {
    await store.dispatch('ClasseModule/fetchClasseByAnnee', {
      idAnnee: idAnnee,
    });
  }

  async function updateClasse(idClasse: number, eleves: string[]) {
    await store.dispatch('ClasseModule/updateClasse', {
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

  return {
    fetchAllClasses,
    fetchClasseByAnnee,
    classes,
    classesByAnnee,
    updateClasse,
    saveClasse,
  };
}
