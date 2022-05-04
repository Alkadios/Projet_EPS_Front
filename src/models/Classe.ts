import { Etablissement, Annee, NiveauScolaire, Eleve, Professeur } from '@/models';

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
