import { Cycle } from '@/models';

export interface NiveauScolaire {
  '@id': string;
  id: number;
  libelle: string;
  cycle?: Cycle;
  typeAf: string;
}
