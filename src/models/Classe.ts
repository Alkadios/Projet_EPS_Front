import { Annee } from './Annee';
import { Eleve } from './Eleve';
import { Etablissement } from './Etablissement';
import { NiveauScolaire } from './NiveauScolaire';

export interface Classe {
  '@id': string;
  id: number;
  niveauScolaire: NiveauScolaire;
  annee: Annee;
  etablissement: Etablissement;
  libelleClasse: string;
  eleves: Eleve[];
}
