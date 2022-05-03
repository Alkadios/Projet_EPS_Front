import { NiveauScolaire } from '@/models';

export interface Etablissement {
  '@id': string;
  id: number;
  nom: string;
  adresse: string;
  cp: string;
  ville: string;
  tel: string;
  mail: string;
  niveauScolaire: NiveauScolaire[];
}
