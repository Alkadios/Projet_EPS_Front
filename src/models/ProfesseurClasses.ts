import { Professeur, Classe } from '@/models';

export interface ProfesseurClasses {
  '@id': string;
  '@type': string;
  id: number;
  professeur: Professeur;
  classe: Classe;
}
