import { ChoixAnnee, AF, ApsaRetenu } from '@/models';
export interface AfRetenus {
  '@id': string;
  id: number;
  ChoixAnnee: ChoixAnnee;
  Af: AF;
  ApsaRetenu: ApsaRetenu[];
}
