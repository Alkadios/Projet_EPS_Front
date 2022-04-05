import { ChampsApprentissageApsa } from '@/models';
export interface ChampApprentissage {
  '@id': string;
  id: number;
  libelle: string;
  color: string;
  champsApprentissageApsas: ChampsApprentissageApsa[];
}
