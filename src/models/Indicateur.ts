import { Critere } from './Critere';

export interface Indicateur {
  '@id': string;
  id: number;
  libelle: string;
  description: string;
  image: string;
  url_video: string;
  color: string;
  Critere: Critere;
}
