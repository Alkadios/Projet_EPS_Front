import { computed } from 'vue';
import { useStore } from 'vuex';
import { Etablissement, Utilisateur, Annee } from '@/models';

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
    return {
      nomEtablissement: 'Lycée Professionnel de St Joseph',
      niveauxScolaires: [
        { id: 10, libelle: 'Seconde' },
        { id: 11, libelle: 'Première' },
        { id: 12, libelle: 'Terminale' },
      ],
    } as Etablissement;
  });
  async function storeEtablissement(anneeEnConfig: Etablissement) {
    await store.dispatch('UtilisateurModule/storeAnneeEnConfig', { anneeEnConfig });
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
    anneeEnConfig,
    storeAnneeEnConfig,
    anneeEnCours,
    fetchAnneeEnCours,
  };
}
