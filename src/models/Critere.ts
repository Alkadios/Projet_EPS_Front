import { ApsaRetenu, Indicateur } from '@/models';

export interface Critere {
  '@id': string;
  '@type': string;
  id: number;
  ApsaRetenu: ApsaRetenu;
  titre: string;
  description: string;
  image: string;
  url_video: string;
  Indicateur: Indicateur[];
}
