import { APSA, AfRetenus } from '@/models';
import { ApsaSelectAnnee } from './ApsaSelectAnnee';
export interface ApsaRetenu {
  '@id': string;
  id: number;
  Apsa: APSA;
  SituationEvaluation: String;
  AfRetenu: AfRetenus;
  ApsaSelectAnnee: ApsaSelectAnnee;
}
