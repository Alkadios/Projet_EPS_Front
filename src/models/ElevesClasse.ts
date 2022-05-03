import { Classe, Eleve } from '@/models';

export interface ElevesClasse {
  '@id': string;
  '@type': string;
  id: number;
  eleve: Eleve;
  classe: Classe;
}
