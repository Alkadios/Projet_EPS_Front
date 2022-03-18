import { computed } from 'vue';
import { useStore } from 'vuex';
import { Etablissement, Utilisateur } from '@/models';

export default function UtilisateurService() {
  const store = useStore();

  const utilisateur = computed((): Utilisateur => {
    return store.getters['UtilisateurModule/getUtilisateur'];
  });
  async function loginUtilisateur(login: { username: string; password: string }) {
    await store.dispatch('UtilisateurModule/loginUtilisateur', { login });
  }
  async function logoutUtilisateur() {
    await store.dispatch('UtilisateurModule/logoutUtilisateur');
  }

  const etablissement = computed((): Etablissement => {
    return { nomEtablissement: 'Lycée Professionnel de St Joseph' } as Etablissement;
  });

  return {
    utilisateur,
    loginUtilisateur,
    logoutUtilisateur,
    etablissement,
  };
}
