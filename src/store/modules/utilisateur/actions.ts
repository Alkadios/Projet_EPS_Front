import { ActionContext } from 'vuex';
import UtilisateurAPI from '@/api/UtilisateurAPI';
import UtilisateurState from './stateInterface';
import { Filtre, FiltreUtilisateur, Organisme } from '@/models';

export default {
  async fetchUtilisateur(context: ActionContext<UtilisateurState, any>, payload: { login: string }) {
    const response = await UtilisateurAPI.fetchUtilisateur(payload.login);
    if (response.data.successful && response.data.body != null) {
      context.commit('setUtilisateur', response.data.body);
    } else {
      context.commit('setUtilisateur', []);
      if (response.data.message !== null) throw new Error(response.data.message);
      else if (response.data.body === null) throw new Error('Erreur : utilisateur inconnu');
      else throw new Error("Une erreur s'est produite");
    }
  },
  async storeToken(context: ActionContext<UtilisateurState, any>, payload: { token: string }) {
    context.commit('setToken', payload.token);
  },
  async storeOrganismesUtilisateur(
    context: ActionContext<UtilisateurState, any>,
    payload: { organismesUtilisateur: Organisme[] }
  ) {
    context.commit('setOrganismesUtilisateur', payload.organismesUtilisateur);
  },
  async storeOrganismeConnecte(
    context: ActionContext<UtilisateurState, any>,
    payload: { organismeConnecte: Organisme }
  ) {
    context.commit('setOrganismeConnecte', payload.organismeConnecte);
  },
  async deconnecterOrganisme(context: ActionContext<UtilisateurState, any>) {
    context.commit('setOrganismeConnecte', {});
  },

  /* Filtres */
  async saveFiltre(context: ActionContext<UtilisateurState, any>, payload: { id_organisme: number; filtre: Filtre }) {
    const response = await UtilisateurAPI.saveFiltre(payload.id_organisme, payload.filtre);
    if (response.data.successful) context.commit('saveFiltre', response.data.body);
    else throw new Error(response.data.message);
  },
  async saveFiltreContact(
    context: ActionContext<UtilisateurState, any>,
    payload: { id_organisme: number; id_contact: string; filtre_utilisateur: FiltreUtilisateur }
  ) {
    const response = await UtilisateurAPI.saveFiltreContact(
      payload.id_organisme,
      payload.id_contact,
      payload.filtre_utilisateur
    );
    if (response.data.successful) context.commit('saveFiltreContact', response.data.body);
    else throw new Error(response.data.message);
  },
  async saveFiltreTechnicien(
    context: ActionContext<UtilisateurState, any>,
    payload: { id_organisme: number; code_technicien: string; filtre_utilisateur: FiltreUtilisateur }
  ) {
    const response = await UtilisateurAPI.saveFiltreTechnicien(
      payload.id_organisme,
      payload.code_technicien,
      payload.filtre_utilisateur
    );
    if (response.data.successful) context.commit('saveFiltreTechnicien', response.data.body);
    else throw new Error(response.data.message);
  },
};
