import { ActionContext } from 'vuex';
import UtilisateurAPI from '@/api/UtilisateurAPI';
import AnneeAPI from '@/api/AnneeAPI';
import UtilisateurState from './stateInterface';
import { Annee, Utilisateur } from '@/models';
import jwtDecode from 'jwt-decode';

export default {
  async loginUtilisateur(
    context: ActionContext<UtilisateurState, any>,
    payload: { login: { username: string; password: string } }
  ) {
    const response = await UtilisateurAPI.loginUtilisateur(payload.login);
    if (response.data) {
      context.commit('setToken', response.data.token);
      const user: any = jwtDecode(response.data.token);
      const utilisateur = {
        email: user.username,
        prenom: user.prenom,
      } as Utilisateur;
      context.commit('setUtilisateur', utilisateur);
      //context.commit('setUtilisateur', response.data.body);
    } else {
      context.commit('setUtilisateur', []);
      // if (response.data.message !== null) throw new Error(response.data.message);
      // else if (response.data.body === null) throw new Error('Erreur : utilisateur inconnu');
      // else throw new Error("Une erreur s'est produite");
    }
  },
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
  async storeToken(context: ActionContext<UtilisateurState, any>, payload: { token: string }) {
    context.commit('setToken', payload.token);
  },
  async storeAnneeEnConfig(context: ActionContext<UtilisateurState, any>, payload: { anneeEnConfig: Annee }) {
    localStorage.setItem('anneeEnConfig', payload.anneeEnConfig.id.toString());
    context.commit('setAnneeEnConfig', payload.anneeEnConfig);
  },
  async fetchAnneeEnCours(context: ActionContext<UtilisateurState, any>, payload: { idAnnee: number }) {
    const response = await AnneeAPI.fetchAnneeEnCours();
    if (response.data['hydra:totalItems'] > 0) {
      context.commit('setAnneeEnCours', response.data['hydra:member'][0]);
    } else {
      context.commit('setAnneeEnCours', {});
    }
  },

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
  async logoutUtilisateur(context: ActionContext<UtilisateurState, any>) {
    context.commit('setUtilisateur', {});
  },
};
