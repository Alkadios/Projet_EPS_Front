import { APSA, AfRetenus } from '@/models';
export interface ApsaRetenu {
  '@id': string;
  id: number;
  Apsa: APSA;
  SituationEvaluation: String;
  AfRetenu: AfRetenus;
}
