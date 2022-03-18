import { Cycle } from '@/models';

export interface NiveauScolaire {
  id: number;
  libelle: string;
  cycle: Cycle;
}
