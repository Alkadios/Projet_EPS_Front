import { ChampApprentissage } from '@/models';

export interface ChoixAnnee {
  '@id': string;
  id: number;
  champApprentissage: ChampApprentissage;
}
