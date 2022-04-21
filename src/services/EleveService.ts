import { computed } from 'vue';
import { useStore } from 'vuex';

export default function EleveService() {
  const store = useStore();

  async function saveEleve(
    nom: string,
    prenom: string,
    telephone: string,
    mailParent1: string,
    mailParent2: string,
    sexeEleve: string,
    user: string,
    etablissement: string
  ) {
    await store.dispatch('EleveModule/saveEleve', {
      nom,
      prenom,
      telephone,
      mailParent1,
      mailParent2,
      sexeEleve,
      user,
      etablissement,
    });
  }

  return {
    saveEleve,
  };
}
