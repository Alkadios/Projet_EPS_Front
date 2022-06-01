import { computed } from 'vue';
import { useStore } from 'vuex';
import { Etablissement, Utilisateur, Annee, Eleve } from '@/models';

/*
Tu te demandes peut-être pourquoi il y a un UtilisateurService et un UserService ? 😅
On m'a dit que c'était toujours bien de séparer en plusieurs fichiers ah mais peut-être pas comme ça 😅 désolé mais flemme de refacto 😉 
*/
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
    return store.getters['UtilisateurModule/getEtablissement'];
  });
  async function fetchEtablissementById(idEtablissement: number) {
    await store.dispatch('UtilisateurModule/fetchEtablissementById', { idEtablissement });
  }

  const anneeEnConfig = computed((): Annee => {
    return store.getters['UtilisateurModule/getAnneeEnConfig'];
  });
  async function storeAnneeEnConfig(anneeEnConfig: Annee) {
    await store.dispatch('UtilisateurModule/storeAnneeEnConfig', { anneeEnConfig });
  }

  const anneeEnCours = computed((): Annee => {
    return store.getters['UtilisateurModule/getAnneeEnCours'];
  });
  async function fetchAnneeEnCours() {
    await store.dispatch('UtilisateurModule/fetchAnneeEnCours');
  }

  return {
    utilisateur,
    loginUtilisateur,
    logoutUtilisateur,
    etablissement,
    fetchEtablissementById,
    anneeEnConfig,
    storeAnneeEnConfig,
    anneeEnCours,
    fetchAnneeEnCours,
  };
}
