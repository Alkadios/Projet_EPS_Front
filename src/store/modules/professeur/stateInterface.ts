import { Professeur } from '@/models';

export default interface ProfesseurState {
  professeurs: Professeur[];
  professeursByEtablissement: Professeur[];
  professeurByRoles: Professeur[];
  professeurById: Professeur;
  professeurByUser: Professeur;
}
