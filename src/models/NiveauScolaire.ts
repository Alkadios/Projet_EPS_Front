import { Cycle } from '@/models';

export interface NiveauScolaire {
  '@id': string;
  id: number | string;
  libelle: string;
  cycle: Cycle;
}
