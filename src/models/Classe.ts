import { ElevesClasse, Etablissement, Annee, NiveauScolaire } from '@/models';

export interface Classe {
  '@id': string;
  id: number;
  libelleClasse: string;
  NiveauScolaire: NiveauScolaire;
  Annee: Annee;
  etablissement: Etablissement;
  eleveClasses: ElevesClasse;
}
