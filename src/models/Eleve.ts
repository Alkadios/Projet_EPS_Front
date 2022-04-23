import { Etablissement } from "./Etablissement";

export interface Eleve {
  '@id': string;
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  mailParent1: string;
  mailParent2: string;
  sexeEleve: string;
  user: string;
  etablissement: Etablissement;
}
