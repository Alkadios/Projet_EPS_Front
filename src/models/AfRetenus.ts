import { ChoixAnnee, AF, ApsaRetenus } from '@/models';
export interface AfRetenus {
  id: number;
  ChoixAnnee: ChoixAnnee;
  Af: AF;
  apsaRetenus: ApsaRetenus[];
}
