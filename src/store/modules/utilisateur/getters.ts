import UtilisateurState from './stateInterface';

export default {
  getUtilisateur(state: UtilisateurState) {
    return state.utilisateur;
  },
  getToken(state: UtilisateurState) {
    return state.token;
  },
  // getOrganismesUtilisateur(state: UtilisateurState) {
  //   return state.organismesUtilisateur;
  // },
  // getOrganismeConnecte(state: UtilisateurState) {
  //   return state.organismeConnecte;
  // },
  // getFiltres(state: UtilisateurState) {
  //   const organismeConnecte: Organisme = state.organismeConnecte;
  //   parseStringDatesToJavascriptDates(
  //     [organismeConnecte],
  //     ['filtres', 'technicien', 'contact', 'organisme', 'filtres_utilisateur', 'filtre', 'debut_periode', 'fin_periode']
  //   );

  //   let filtresOrganisme = organismeConnecte.filtres?.map((f) => ({ filtre: f, est_defaut: false })) ?? [];
  //   const filtresContact = organismeConnecte.contact?.filtres_utilisateur ?? [];
  //   const filtresTechnicien = organismeConnecte.technicien?.filtres_utilisateur ?? [];

  //   const idFiltresUtilisateur = [
  //     ...filtresContact.map((fc) => fc.filtre.id_filtre),
  //     ...filtresTechnicien.map((ft) => ft.filtre.id_filtre),
  //   ];
  //   filtresOrganisme = filtresOrganisme.filter((f) => !idFiltresUtilisateur.includes(f.filtre.id_filtre));

  //   return [...filtresOrganisme, ...filtresContact, ...filtresTechnicien];
  // },
  // getIdFiltreEnregistre(state: UtilisateurState) {
  //   return state.idFiltreEnregistre;
  // },
};
