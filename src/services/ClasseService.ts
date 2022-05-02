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

  async function updateClasse(idClasse: number, eleves: Eleve[]) {
    await store.dispatch('EleveModule/updateEleve', {
      idClasse: idClasse,
      eleves,
    });
  }


  async function saveClasse(
    libelleClasse: string,
    NiveauScolaire: NiveauScolaire,
    Annee: Annee,
    etablissement: Etablissement,
  ) {
    await store.dispatch('EleveModule/saveEleve', {
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
    saveClasse
  };
}
