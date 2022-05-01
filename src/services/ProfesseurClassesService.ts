import { computed } from 'vue';
import { useStore } from 'vuex';
import { ProfesseurClasses } from '@/models';

export default function ProfesseurClassesService() {
  const store = useStore();

  const professeurClasses = computed((): ProfesseurClasses => {
    return store.getters['ProfesseurClassesModule/getProfesseurClasses'];
  });

  async function fetchAllProfesseurClasses() {
    await store.dispatch('ProfesseurClassesModule/fetchAllProfesseurClasses');
  }

  const classesByProfesseur = computed((): ProfesseurClasses[] => {
    return store.getters['ProfesseurClassesModule/getClassesByProfesseur'];
  });
  async function fetchClassesByProfesseur(idProfesseur: number) {
    await store.dispatch('ProfesseurClassesModule/fetchClassesByProfesseur', {
      idProfesseur: idProfesseur,
    });
  }

  return {
    professeurClasses,
    fetchAllProfesseurClasses,
    classesByProfesseur,
    fetchClassesByProfesseur,
  };
}
