import { NiveauScolaire } from './NiveauScolaire';
import { Professeur } from './Professeur';

export interface Etablissement {
  '@id': string;
  id: number;
  nom: string;
  adresse: string;
  cp: string;
  ville: string;
  nomEtablissement: string;
  tel: string;
  mail: string;
  niveauScolaire: NiveauScolaire[];
  Professeur: Professeur[];
}
