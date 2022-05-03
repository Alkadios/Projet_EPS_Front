import { ProfesseurClasses, Etablissement } from '@/models';

export interface Professeur {
  '@id': string;
  '@type': string;
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  cours: string;
  user: string;
  etablissement: Etablissement;
  professeurClasses: ProfesseurClasses;
}
