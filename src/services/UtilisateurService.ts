import { computed } from 'vue';
import { useStore } from 'vuex';
import { Utilisateur } from '@/models';

export default function UtilisateurService() {
  const store = useStore();

  const utilisateur = computed((): Utilisateur => {
    return store.getters['UtilisateurModule/getUtilisateur'];
  });
  async function fetchUtilisateur(login: string) {
    await store.dispatch('UtilisateurModule/fetchUtilisateur', { login });
  }
  async function deconnecterUtilisateur() {
    await store.dispatch('UtilisateurModule/deconnecterOrganisme');
  }

  return {
    utilisateur,
    fetchUtilisateur,
    deconnecterUtilisateur,
  };
}
