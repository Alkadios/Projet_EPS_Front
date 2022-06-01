import { Etablissement } from './Etablissement';

export interface User {
  '@id': string;
  id: number;
  email: string;
  roles: string[];
  password: string;
  professeurs: number;
  etablissements: Etablissement[];
}
