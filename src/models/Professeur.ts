import { Etablissement } from '@/models';
import { User } from './User';

export interface Professeur {
  '@id': string;
  '@type': string;
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  cours: string;
  user: User;
  etablissement: Etablissement;
  etablissements: Etablissement[];
}
