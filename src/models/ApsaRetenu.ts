import { APSA, AfRetenus } from '@/models';
export interface ApsaRetenu {
  '@id': string;
  id: number;
  Apsa: APSA;
  AfRetenu: AfRetenus;
}
