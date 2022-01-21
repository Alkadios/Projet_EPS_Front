import { Filtre, FiltreUtilisateur, Organisme, Utilisateur } from '@/models';
import UtilisateurState from './stateInterface';

export default {
  setUtilisateur(state: UtilisateurState, payload: Utilisateur) {
    state.utilisateur = payload;
  },
  setToken(state: UtilisateurState, payload: string) {
    state.token = payload;
  },
  setOrganismesUtilisateur(state: UtilisateurState, payload: Organisme[]) {
    state.organismesUtilisateur = payload;
  },
  setOrganismeConnecte(state: UtilisateurState, payload: Organisme) {
    state.organismeConnecte = payload;
  },

  /* Filtres */
  saveFiltre(state: UtilisateurState, payload: Filtre) {
    state.idFiltreEnregistre = payload.id_filtre;

    const indexFiltreExistant = state.organismeConnecte.filtres?.findIndex((f) => f.id_filtre === payload.id_filtre);

    if (indexFiltreExistant !== undefined && indexFiltreExistant !== -1)
      state.organismeConnecte.filtres?.splice(indexFiltreExistant, 1, payload);
    else state.organismeConnecte.filtres?.push(payload);
  },
  saveFiltreContact(state: UtilisateurState, payload: FiltreUtilisateur) {
    state.idFiltreEnregistre = payload.filtre.id_filtre;

    const indexFiltreUtilisateurExistant = state.organismeConnecte.contact?.filtres_utilisateur?.findIndex(
      (fu) => fu.filtre.id_filtre === payload.filtre.id_filtre
    );

    if (indexFiltreUtilisateurExistant !== undefined && indexFiltreUtilisateurExistant !== -1)
      state.organismeConnecte.contact?.filtres_utilisateur?.splice(indexFiltreUtilisateurExistant, 1, payload);
    else state.organismeConnecte.contact?.filtres_utilisateur?.push(payload);
  },
  saveFiltreTechnicien(state: UtilisateurState, payload: FiltreUtilisateur) {
    state.idFiltreEnregistre = payload.filtre.id_filtre;

    const indexFiltreUtilisateurExistant = state.organismeConnecte.technicien?.filtres_utilisateur?.findIndex(
      (fu) => fu.filtre.id_filtre === payload.filtre.id_filtre
    );

    if (indexFiltreUtilisateurExistant !== undefined && indexFiltreUtilisateurExistant !== -1)
      state.organismeConnecte.technicien?.filtres_utilisateur?.splice(indexFiltreUtilisateurExistant, 1, payload);
    else state.organismeConnecte.technicien?.filtres_utilisateur?.push(payload);
  },
};
