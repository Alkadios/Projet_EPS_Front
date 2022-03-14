import { ChampsApprentissageApsa } from '@/models';
export interface ChampApprentissage {
  id: number;
  libelle: string;
  color: string;
  champsApprentissageApsas: ChampsApprentissageApsa[];
}
