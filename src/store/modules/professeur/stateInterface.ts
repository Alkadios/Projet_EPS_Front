import { Professeur } from '@/models';

export default interface ProfesseurState {
  professeurs: Professeur[];
  professeursByEtablissement: Professeur[];
  professeurById: Professeur;
}
