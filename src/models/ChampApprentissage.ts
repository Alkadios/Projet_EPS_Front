import { APSA } from '@/models';
export interface ChampApprentissage {
  id: number;
  libelle: string;
  color: string;
  apsas: APSA[];
}
