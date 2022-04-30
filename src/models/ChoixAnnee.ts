import { ChampApprentissage } from '@/models';
import { Annee } from './Annee';
import { NiveauScolaire } from './NiveauScolaire';

export interface ChoixAnnee {
  '@id': string;
  id: number;
  Annee: String;
  Niveau: String | NiveauScolaire;
  champApprentissage: ChampApprentissage;
}
