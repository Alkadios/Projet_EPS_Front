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

  const annee = computed((): Annee => {
    return { '@id': '/api/annees/1', id: 1 } as Annee;
  });

  return {
    utilisateur,
    loginUtilisateur,
    logoutUtilisateur,
    etablissement,
    annee,
  };
}
