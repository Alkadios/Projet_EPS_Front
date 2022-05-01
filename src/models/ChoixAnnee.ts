import { ChampApprentissage, AfRetenus, NiveauScolaire, Annee } from '@/models';
export interface ChoixAnnee {
  '@id': string;
  id: number;
  Annee: string;
  Niveau: NiveauScolaire | string;
  champApprentissage: ChampApprentissage;
  afRetenus: AfRetenus[];
}
