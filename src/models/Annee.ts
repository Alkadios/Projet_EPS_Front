import { ChoixAnnee } from './ChoixAnnee';

export interface Annee {
  '@id': string;
  id: number;
  choixAnnees: ChoixAnnee[];
}
