import { ElevesClasse, Etablissement, EvaluationEleve } from '@/models';

export interface Eleve {
  '@id': string;
  '@type': string;
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  mailParent1: string;
  mailParent2: string;
  dateNaiss: string;
  sexeEleve: string;
  user: string;
  evaluationEleves: EvaluationEleve;
  etablissement: Etablissement;
  eleveClasses: ElevesClasse;
}
