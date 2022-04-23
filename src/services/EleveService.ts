import { Etablissement } from '@/models';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function EleveService() {
  const store = useStore();

  async function saveEleve(
    email: string,
    roles:string,
    password:string,
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
      etablissement
    });
  }

  return {
    saveEleve,
  };
}
