import { ApsaSelectAnnee } from './ApsaSelectAnnee';
import { ChoixAnnee } from './ChoixAnnee';

export interface Annee {
  '@id': string;
  id: number;
  annee: string;
  enCours: boolean;
  choixAnnees?: ChoixAnnee[];
  apsaSelectAnnees: ApsaSelectAnnee[];
}
