import { Classe } from '@/models';
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

  return {
    fetchAllClasses,
    fetchClasseByAnnee,
    classes,
    classesByAnnee,
  };
}
