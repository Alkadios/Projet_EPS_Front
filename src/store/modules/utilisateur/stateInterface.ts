import { Annee, Etablissement, Utilisateur } from '@/models';

export default interface UtilisateurState {
  utilisateur: Utilisateur;
  token: string;
  etablissement: Etablissement;
  anneeEnConfig: Annee;
  anneeEnCours: Annee;
}
