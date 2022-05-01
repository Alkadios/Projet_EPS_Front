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
    classes,
    fetchAllClasses,
    classesByAnneeAndProfesseur,
    fetchClasseByAnneeAndProf,
  };
}
