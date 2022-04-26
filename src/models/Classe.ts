import { ElevesClasse, Etablissement, Annee, NiveauScolaire } from '@/models';
import { Eleve } from './Eleve';
import { Professeur } from './Professeur';

export interface Classe {
  '@id': string;
  id: number;
  libelleClasse: string;
  NiveauScolaire: NiveauScolaire;
  Annee: Annee;
  etablissement: Etablissement;
  eleves: Eleve[];
  professeurs: Professeur[];
}
