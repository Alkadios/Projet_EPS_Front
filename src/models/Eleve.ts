import { Classe } from './Classe';
import { Etablissement } from './Etablissement';

export interface Eleve {
  '@id': string;
  '@type': string;
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  mailParent1: string;
  mailParent2: string;
  classe: Classe[];
  dateNaiss: string;
  sexeEleve: string;
  user: string;
  etablissement: Etablissement;
}
