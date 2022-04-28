import { ChampApprentissage, AfRetenus } from '@/models';

export interface ChoixAnnee {
  '@id': string;
  id: number;
  champApprentissage: ChampApprentissage;
  afRetenus: AfRetenus[];
}
