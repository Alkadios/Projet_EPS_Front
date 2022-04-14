import { ApsaRetenu } from '@/models';

export interface Critere {
  '@id': string;
  id: number;
  ApsaRetenu: ApsaRetenu;
  titre: string;
  description: string;
  image: string;
  url_video: string;
}
