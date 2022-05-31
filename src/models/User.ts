import { Professeur } from './Professeur';

export interface User {
  '@id': string;
  id: number;
  email: string;
  roles: string[];
  password: string;
  professeurs: number;
  etablissements: string[];
  currentEtablissement: number;
}
