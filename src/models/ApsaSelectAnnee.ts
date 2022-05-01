import { APSA, ChampApprentissage } from '@/models';
import { Annee } from './Annee';
import { ApsaRetenu } from './ApsaRetenu';
import { Etablissement } from './Etablissement';
export interface ApsaSelectAnnee {
  '@id': string;
  Ca: ChampApprentissage;
  Apsa: APSA;
  Annee: Annee;
  apsaRetenus: ApsaRetenu;
  etablissement: Etablissement;
}
