import { Utilisateur } from '@/models';
import UtilisateurState from './stateInterface';

export default {
  setUtilisateur(state: UtilisateurState, payload: Utilisateur) {
    state.utilisateur = payload;
  },
  setToken(state: UtilisateurState, payload: string) {
    state.token = payload;
  },
  // setOrganismesUtilisateur(state: UtilisateurState, payload: Organisme[]) {
  //   state.organismesUtilisateur = payload;
  // },
  // setOrganismeConnecte(state: UtilisateurState, payload: Organisme) {
  //   state.organismeConnecte = payload;
  // },
};
