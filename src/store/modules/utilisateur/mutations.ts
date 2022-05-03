import { Etablissement, Utilisateur, Annee } from '@/models';
import UtilisateurState from './stateInterface';

export default {
  setUtilisateur(state: UtilisateurState, payload: Utilisateur) {
    state.utilisateur = payload;
  },
  setToken(state: UtilisateurState, payload: string) {
    state.token = payload;
  },
  setEtablissement(state: UtilisateurState, payload: Etablissement) {
    state.etablissement = payload;
  },
  setAnneeEnConfig(state: UtilisateurState, payload: Annee) {
    state.anneeEnConfig = payload;
  },
  setAnneeEnCours(state: UtilisateurState, payload: Annee) {
    state.anneeEnCours = payload;
  },
  // setOrganismesUtilisateur(state: UtilisateurState, payload: Organisme[]) {
  //   state.organismesUtilisateur = payload;
  // },
  // setOrganismeConnecte(state: UtilisateurState, payload: Organisme) {
  //   state.organismeConnecte = payload;
  // },
};
