import { ActionContext } from 'vuex';
import UtilisateurAPI from '@/api/UtilisateurAPI';
import UtilisateurState from './stateInterface';
import { Utilisateur } from '@/models';

export default {
  // async fetchUtilisateur(context: ActionContext<UtilisateurState, any>, payload: { login: string }) {
  //   const response = await UtilisateurAPI.fetchUtilisateur(payload.login);
  //   if (response.data.successful && response.data.body != null) {
  //     context.commit('setUtilisateur', response.data.body);
  //   } else {
  //     context.commit('setUtilisateur', []);
  //     if (response.data.message !== null) throw new Error(response.data.message);
  //     else if (response.data.body === null) throw new Error('Erreur : utilisateur inconnu');
  //     else throw new Error("Une erreur s'est produite");
  //   }
  // },
  // async storeToken(context: ActionContext<UtilisateurState, any>, payload: { token: string }) {
  //   context.commit('setToken', payload.token);
  // },
  // async storeOrganismesUtilisateur(
  //   context: ActionContext<UtilisateurState, any>,
  //   payload: { organismesUtilisateur: Organisme[] }
  // ) {
  //   context.commit('setOrganismesUtilisateur', payload.organismesUtilisateur);
  // },
  // async storeOrganismeConnecte(
  //   context: ActionContext<UtilisateurState, any>,
  //   payload: { organismeConnecte: Organisme }
  // ) {
  //   context.commit('setOrganismeConnecte', payload.organismeConnecte);
  // },
  // async deconnecterOrganisme(context: ActionContext<UtilisateurState, any>) {
  //   context.commit('setOrganismeConnecte', {});
  // },
};
