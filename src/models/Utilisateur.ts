import { RoleUtilisateur } from '@/models';
export interface Utilisateur {
  email: string;
  prenom: string;
  nom: string;
  telephone: string;
  role: RoleUtilisateur;
}
